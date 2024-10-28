import express from "express";
import { register,login,logout } from "../controllers/auth.controllers.js";

const router=express.Router();

router.post("/register",register);

router.post("/login", (req, res, next) => {
    console.log("Login request received", req.body);
    next();
}, login);

router.post("/logout",logout);

export default router;