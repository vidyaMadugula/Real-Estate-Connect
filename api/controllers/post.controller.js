import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

// export const getPosts = async (req, res) => {
//   const { page = 1, limit = 10, city, type, property, bedroom, minPrice, maxPrice } = req.query;

//   const pageNumber = parseInt(page);
//   const limitNumber = parseInt(limit);

//   try {
//     // const posts = await prisma.post.findMany({
//     //   where: {
//     //     city: city || undefined,
//     //     type: type || undefined,
//     //     property: property || undefined,
//     //     bedroom: parseInt(bedroom) || undefined,
//     //     price: {
//     //       gte: parseInt(minPrice) || undefined,
//     //       lte: parseInt(maxPrice) || undefined,
//     //     },
//     //   },
//     //   skip: (pageNumber - 1) * limitNumber,
//     //   take: limitNumber,
//     // });
//     const posts = await prisma.post.findMany({
//       where: {
//         city: city || undefined,
//         type: type || undefined,
//         property: property || undefined,
//         bedroom: parseInt(bedroom) || undefined,
//         price: {
//           gte: parseInt(minPrice) || undefined,
//           lte: parseInt(maxPrice) || undefined,
//         },
//       },
//       skip: (pageNumber - 1) * limitNumber,
//       take: limitNumber,
//     });
    
//     if (!posts || posts.length === 0) {
//       console.log("No posts found with the current filters.");
//     }
    

//     res.status(200).json(posts);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: 500, message: "Failed to get posts" });
//   }
// };
// Utility function to handle BigInt conversion recursively

function convertBigIntToString(obj) {
  if (typeof obj === 'bigint') {
    return obj.toString(); // Convert BigInt to string
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => convertBigIntToString(item)); // Handle arrays
  }

  if (obj !== null && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = convertBigIntToString(obj[key]); // Recursively process the object
      }
    }
  }

  return obj;
}


export const getPosts = async (req, res) => {
  const { page = 1, limit = 10, city, type, property, bedroom, minPrice, maxPrice } = req.query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: city || undefined,
        type: type || undefined,
        property: property || undefined,
        bedroom: parseInt(bedroom) || undefined,
        price: {
          gte: parseInt(minPrice) || undefined,
          lte: parseInt(maxPrice) || undefined,
        },
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    // Convert any BigInt fields to strings before sending the response
    const postsWithStringifiedBigInt = posts.map(post => convertBigIntToString(post));

    res.status(200).json(postsWithStringifiedBigInt);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Failed to get posts" });
  }
};





export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          postDetail: true,
          user: {
            select: {
              username: true,
              avatar: true,
            },
          },
          savedBy: true,
        },
      });
  
      const token = req.cookies?.token;
  
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
          if (!err) {
            const saved = await prisma.savedPost.findUnique({
              where: {
                userId_postId: {
                  postId: id,
                  userId: payload.id,
                },
              },
            });
            // Send response here if token is valid
            // return res.status(200).json({ ...post, isSaved: saved ? true : false });
          const postWithStringifiedBigInt = convertBigIntToString(post);
          return res.status(200).json({ ...postWithStringifiedBigInt, isSaved: saved ? true : false });
          }
          // If token verification failed, you can log or handle it accordingly
        });
      } else {
        // If no token is present, send this response
        // res.status(200).json({ ...post, isSaved: false });
      const postWithStringifiedBigInt = convertBigIntToString(post);
      res.status(200).json({ ...postWithStringifiedBigInt, isSaved: false });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({status: 500, message: "Failed to get post" });
    }
  };
  




export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 500, message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 500, message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({status: 403, message: "Not Authorized! for Deleting Post" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 500, message: "Failed to delete post" });
  }
};



export const getOwnerDetails = async (req, res) => {
  const { postId } = req.params;
  const userId = req.userId; // Authenticated user

  console.log("Fetching owner details for postId:", postId);
  console.log("Authenticated userId:", userId);

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: true },
    });

    console.log("Post found..:", post);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.user) {
      console.error("User details missing for post:", postId);
      return res.status(500).json({ message: "Post owner details not found" });
    }

    const owner = post.user;

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    console.log("Current user details:", currentUser);

    if (!currentUser) {
      return res.status(403).json({ message: "User not found" });
    }

    if (currentUser.subscriptionActive) {
      return res.json({
        ownerName: owner.username,
        phone: owner.phone || "Not available",
        address: post.address,
      });
    }

    if (currentUser.contactRequests >= 5) {
      return res.status(403).json({ message: "You have reached your free limit. Subscribe to continue." });
    }

    console.log("")
    await prisma.user.update({
      where: { id: userId },
      data: { contactRequests: currentUser.contactRequests + BigInt(1) },
    });


    return res.json({
      ownerName: owner.username,
      phone: owner.phone || "Not available",
      address: post.address,
    });
  } catch (error) {
    console.error("Error fetching owner details:", error);
    res.status(500).json({ message: "Error fetching owner details" });
  }
};



export const subscribeUser = async (req, res) => {
  const userId = req.userId;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { subscriptionActive: true, contactRequests: 0 }, // Reset limit
    });

    res.json({ message: "Subscription activated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Subscription failed" });
  }
};