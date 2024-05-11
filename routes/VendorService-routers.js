import express from "express";
import { storage } from "../config/multer.config";
import multer from "multer";
const VendorServiceControlers = require('../controllers/VendorServices.controller')


const upload = multer({
    storage: storage
});

export const VendorServiceRouter = express.Router();

VendorServiceRouter.post("/Add-VendorService", upload.array('image'), VendorServiceControlers.createVendorServices);
VendorServiceRouter.get("/All-VendorService",  VendorServiceControlers.ShowAllVendorServices);


//in active vendor service 
VendorServiceRouter.post("/Off-Active-VendorService", VendorServiceControlers.InActiveVendorServices);

// active vendor service 

VendorServiceRouter.post("/On-Active-VendorService", VendorServiceControlers.ActiveVendorServices);

// permanently delete vendor service 
VendorServiceRouter.delete("/Delete-VendorService", VendorServiceControlers.DeleteVendorServices);



