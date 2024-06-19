import express from "express";

const userControllers =  require( "../controllers/user.controller"); // Ensure these imports are correct

const eventControllers=require("../controllers/EventCoordinator.controller")
const {  meetingNotes ,registerEventCoordinator,feedbacks,registerUsers,registerVendors,vendorservices } = require("../middlewares/validate")





export const userRouter = express.Router();

// Define routes with proper callback functions
userRouter.get("/ShowAll-Vendor", userControllers.ShowAllVendor );


userRouter.post("/register-EventCoordinator",eventControllers.registerEventCoordinator); // check this Event cordinator 




// sign up Api
userRouter.post("/register-user",userControllers.registerUser);
userRouter.post("/register-Vendor",userControllers.registerVendor);




// sign in Api
userRouter.post("/login",userControllers.login );


