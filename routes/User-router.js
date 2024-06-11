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


// CRUD operation of Event Coordinator
userRouter.post("/register-EventCoordinator",eventControllers.registerEventCoordinator); // check this Event cordinator 
userRouter.get("/showAll-EventCoordinator",eventControllers.ShowAllCoordinators);
userRouter.put("/inactive-EventCoordinator",eventControllers.InActiveCoordinator);
userRouter.put("/Active-EventCoordinator",eventControllers.ActiveEventCoordinator);

userRouter.put("/SoftDelete-EventCoordinator",eventControllers.SoftDeleteCoordinator);
userRouter.delete("/PermanentDelete-EventCoordinator",eventControllers.PermanentDeleteCoordinator);
userRouter.put("/update-EventCoordinator",eventControllers.updatedEventCoordinator);


// CRUD operation of User
userRouter.post("/register-user",userControllers.registerUser);


// CRUD operation of Vendor
userRouter.post("/register-Vendor",userControllers.registerVendor);
userRouter.get("/ShowAll-Vendor", userControllers.ShowAllVendor );




// sign in Api
userRouter.post("/login",userControllers.login );


