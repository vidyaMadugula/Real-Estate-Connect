import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getPost,getPosts,addPost,updatePost,deletePost ,getOwnerDetails,subscribeUser} from "../controllers/post.controller.js";

const router=express.Router();

router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/",verifyToken,addPost)
router.put("/:id",verifyToken,updatePost)
router.delete("/:id",verifyToken,deletePost)
router.get("/getOwnerDetails/:postId",verifyToken, getOwnerDetails);
router.post("/subscribe", verifyToken, subscribeUser);


export default router;