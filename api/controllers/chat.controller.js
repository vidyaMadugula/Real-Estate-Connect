import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  // console.log("userId",tokenUserId);
  if (!tokenUserId) {
    return res.status(401).json({status: 401, message: "User ID is not defined" });
}
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });
    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 500, message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
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
    const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

    // Fetch receiver details for the chat
    const receiver = await prisma.user.findUnique({
      where: {
        id: receiverId,
      },
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    });

    // Attach receiver details to chat
    chat.receiver = receiver;

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 500, message: "Failed to get chat!" });
  }
};





// export const addChat = async (req, res) => {
//   const tokenUserId = req.userId;
//   const receiverId = req.body.receiverId;

//   try {
    
//     const existingChat = await prisma.chat.findFirst({
//       where: {
//         userIDs: { equals: [tokenUserId, receiverId] }
//       }
//     });
    

//     if (existingChat) {
//       return res.status(200).json(existingChat);
//     }

//     // Create a new chat if it doesn't exist
//     const newChat = await prisma.chat.create({
//       data: {
//         userIDs: [tokenUserId, receiverId],
//       },
//     });
//     res.status(201).json(newChat);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: 500, message: "Failed to add chat!" });
//   }
// };


export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const receiverId = req.body.receiverId;
  

  try {
    // Step 1: Check if chat already exists (order doesn't matter)
    const existingChat = await prisma.chat.findFirst({
      where: {
        userIDs: {
          hasEvery: [tokenUserId, receiverId]  // This checks if both users exist in any order
        }
      }
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    // Step 2: If no chat exists, create a new one
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, receiverId],
      },
    });

    res.status(201).json(newChat);
  } catch (err) {
    console.error("Error in addChat:", err);
    res.status(500).json({ status: 500, message: "Failed to add chat!" });
  }
};



export const readChat = async (req, res) => {
  const tokenUserId = req.userId; 
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 500, message: "Failed to read chat!" });
  }
};




// export const addChat = async (req, res) => {
//   const tokenUserId = req.userId;
//   try {
//     const newChat = await prisma.chat.create({
//       data: {
//         userIDs: [tokenUserId, req.body.receiverId],
//       },
//     });
//     res.status(200).json(newChat);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({status: 500, message: "Failed to add chat!" });
//   }
// };
