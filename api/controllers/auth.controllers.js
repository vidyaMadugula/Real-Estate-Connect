import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt  from "jsonwebtoken";


export const register=async (req,res)=>{
    const {username,email,password}=req.body;

    //HASH THE PASSWORD
    try{
        const existingUserByUsername = await prisma.user.findUnique({
            where: { username }
          });
          if (existingUserByUsername) {
            return res.status(400).json({ error: "Username is already taken" });
          }
      
          // Check if the email already exists
          const existingUserByEmail = await prisma.user.findUnique({
            where: { email }
          });
          if (existingUserByEmail) {
            return res.status(400).json({ error: "Email is already taken" });
          }
        const hashedPassword=await bcrypt.hash(password,10);

    //    console.log(hashedPassword)

    const newUser=await prisma.user.create({
        data:{
            username,
            email,
            password:hashedPassword,
        }
    });
    // console.log(newUser);

    res.status(201).json({message:"User created successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"failed to create user!"})
    }

    
    
}
export const login=async (req,res)=>{

    const {username,password}= req.body;

    try{
    //CHECK IF USER EXISTS
    const user=await prisma.user.findUnique({
        where:{username}
    })
    if(!user) return res.status(401).json({message:"Invalid Credentials!"})


    //CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid=await bcrypt.compare(password,user.password);
    

    if(!isPasswordValid) return res.status(401).json({message:"Invalid Credentials!"})

 

    //GENERATE COOKIE TOKEN AND SEND TO THE USER

    // Expiry time 1 week

    const age = 1000 * 60 * 60 * 24 * 7;

    const token=jwt.sign(
        {
        id:user.id,
        isAdmin:true,
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn:age}
    );
    
    const {password: userPassword,...userInfo}=user;
    res
    .cookie("token",token,{
        httpOnly:true,
        // secure:true,
        maxage:age,
    })
    .status(200)
    .json(userInfo)
    // console.log("token",token);

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to login"})
    }
    
    

}
export const logout=(req,res)=>{
    res.clearCookie("token").status(200).json({message:"Logout successful"})
}