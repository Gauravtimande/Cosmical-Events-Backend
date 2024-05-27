import express from "express";
import { storage } from "../config/multer.config";
import multer from "multer";
const userControllers =  require( "../controllers/user.controller"); // Ensure these imports are correct
const vendorControllers= require("../controllers/Appointment.controller")
const feedbackControllers =require("../controllers/feedback.controller");
const serviceControllers=require("../controllers/VendorServices.controller")
const eventControllers=require("../controllers/EventCoordinator.controller")
const {  meetingNotes ,registerEventCoordinator,feedbacks,registerUsers,registerVendors,vendorservices } = require("../middlewares/validate")

// Multer Configuration
const upload = multer({
    storage: storage
});feedbacks

export const userRouter = express.Router();

// Define routes with proper callback functions
userRouter.get("/ShowAll-Vendor",userControllers.ShowAllVendor );
userRouter.post("/meeting-notes",meetingNotes,vendorControllers.BookAppointment);

userRouter.post("/register-EventCoordinator", registerEventCoordinator,eventControllers.registerEventCoordinator); // check this Event cordinator 

userRouter.post("/feedback", feedbacks,feedbackControllers.CreateFeedback);
userRouter.post("/register-user", registerUsers,userControllers.registerUser);
userRouter.post("/register-Vendor", registerVendors,userControllers.registerVendor);
userRouter.post("/vendor-services", vendorservices,serviceControllers.createVendorServices);


userRouter.post("/login",userControllers.login );


