import express from "express";
import fse from "fs-extra";
import multer from "multer";
import path from "path";
const VendorServiceControlers = require('../controllers/VendorServices.controller')


const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      let dirPath;
      if (file.fieldname === "image") {
        dirPath = "uploads/";
      } else if (file.fieldname === "video") {
        dirPath = "VideoUploads/";
      }
      fse.ensureDirSync(path.resolve(dirPath));
      cb(null, path.resolve(dirPath));
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  }),
  limits: {
    fileSize: {
      image: 15 * 1024 * 1024, // 15 MB in bytes for images
      video: 1024 * 1024 * 1024 // 1 GB in bytes for videos
    }
  },
  fileFilter: function(req, file, cb) {
    if (file.fieldname === "image" && !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    if (file.fieldname === "video" && !file.originalname.match(/\.(mp4|mov|avi|wmv)$/)) {
      return cb(new Error('Only video files are allowed!'));
    }
    cb(null, true);
  }
});

export const VendorServiceRouter = express.Router();

VendorServiceRouter.post("/Add-VendorService-info", upload.fields([{ name: 'image', maxCount: 10 }, { name: 'video', maxCount: 1 }]), VendorServiceControlers.createVendorServices);
VendorServiceRouter.get("/All-VendorService", VendorServiceControlers.ShowAllVendorServices);


//in active vendor service 
VendorServiceRouter.post("/Off-Active-VendorService", VendorServiceControlers.InActiveVendorServices);

// active vendor service 

VendorServiceRouter.post("/On-Active-VendorService", VendorServiceControlers.ActiveVendorServices);

// permanently delete vendor service 
VendorServiceRouter.delete("/Delete-VendorService", VendorServiceControlers.DeleteVendorServices);


VendorServiceRouter.post('/add-enum-value', VendorServiceControlers.AddVendorServices);
VendorServiceRouter.post('/delete-enum-value', VendorServiceControlers.DeleteVendorService);