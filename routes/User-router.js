
import multer from "multer";
import express from "express";
import { validateUserLogin } from "../middlewares/user.middleware";
import { storage } from "../config/multer.config";
import { login, registerUser } from "../controllers/user.controller";



// Multer Configuration
const upload = multer({
    storage: storage
});

export const userRouter = express.Router();

    userRouter.post("/register-user", registerUser)
    userRouter.post("/login", [validateUserLogin], login)





