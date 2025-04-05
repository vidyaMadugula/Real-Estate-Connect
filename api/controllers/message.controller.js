import prisma from "../lib/prisma.js";


export const addMessage=async(req,res)=>{
    const tokenUserId=req.userId;
    const chatId=req.params.chatId;
    const text=req.body.text;
    try{
        // const chat = await prisma.chat.findUnique({
        //     where:{
        //         id:chatId,
        //         userIDs:{
        //             hasSome:[tokenUserId],
        //         },
        //     },
        // });
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createAt: "asc",
                    },
                },
            },
        });
        

        if(!chat) return res.status(404).json({status: 404,message:"Chat not found"})

        const message=await prisma.message.create({
             data:{
                    text,
                    chatId,
                    userId:tokenUserId,
                    createAt: new Date(), 
            },
        });

        await prisma.chat.update({
                where:{
                    id:chatId,
                },
                data:{
                    seenBy:[tokenUserId],
                    lastMessage:text,
                },
            });

        res.status(200).json(message)
    }catch(err){
        console.log(err)
        res.status(500).json({status: 500,message:"Failed to add mesage!"})
    }
}

