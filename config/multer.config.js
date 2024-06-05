import path from "path";
import multer from "multer";
import fse from "fs-extra";

// Storage configuration for images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirPath = "uploads/";
    fse.ensureDirSync(path.resolve(dirPath)); // Ensure the directory exists
    cb(null, path.resolve(dirPath));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Prefix with timestamp to avoid conflicts
  }
});

// Storage configuration for videos
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirPath = "VideoUploads/";
    fse.ensureDirSync(path.resolve(dirPath)); // Ensure the directory exists
    cb(null, path.resolve(dirPath));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Prefix with timestamp to avoid conflicts
  }
});

export { imageStorage, videoStorage };
