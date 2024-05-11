import express from "express";
import { storage } from "../config/multer.config";
import multer from "multer";
const userControllers =  require( "../controllers/user.controller"); // Ensure these imports are correct

// Multer Configuration
const upload = multer({
    storage: storage
});

export const userRouter = express.Router();

// Define routes with proper callback functions
userRouter.post("/register-user",userControllers.registerUser);
userRouter.post("/login",userControllers.login );
