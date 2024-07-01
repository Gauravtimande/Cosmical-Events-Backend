import express from "express";
import { storage } from "../config/multer.config";
import multer from "multer";
const userControllers =  require( "../controllers/user.controller"); // Ensure these imports are correct
const vendorControllers= require("../controllers/Appointment.controller")
const feedbackControllers =require("../controllers/feedback.controller");
const serviceControllers=require("../controllers/VendorServices.controller")
const eventControllers=require("../controllers/EventCoordinator.controller")
const {  meetingNotes ,registerEventCoordinator,feedbacks,registerUsers,registerVendors,vendorservices } = require("../middlewares/validate")





export const userRouter = express.Router();

// Define routes with proper callback functions
userRouter.get("/ShowAll-users", userControllers.ShowAlluser );


userRouter.post("/register-EventCoordinator",eventControllers.registerEventCoordinator); // check this Event cordinator 




// sign up Api
userRouter.post("/verifyOTP",userControllers.verifyOTPAndRegister);
userRouter.post("/register-user",userControllers.registerUser);
userRouter.post("/register-Vendor",userControllers.registerVendor);
userRouter.post("/register-CO-ORDINATOR",userControllers.registerCO_ORDINATOR);


userRouter.delete("/delete-user",userControllers.deleteUser);
userRouter.get("/all-user",userControllers.getCounts);


// sign in Api
userRouter.post("/login",userControllers.login );


