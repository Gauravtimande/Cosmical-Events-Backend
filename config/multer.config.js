/* eslint-disable node/callback-return */
import path from "path";
import multer from "multer";
import fse from "fs-extra";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dirpath = "uploads/";
    let docDirPath = "uploads/docs/"
    if (file.fieldname == "image") {
      const fileDir = path.resolve(dirpath);
      fse.ensureDirSync(fileDir); // Make sure that the upload path exits

      cb(null, fileDir);
    }
    if (file.fieldname == "docs") {
      const fileDir = path.resolve(docDirPath);
      fse.ensureDirSync(fileDir); // Make sure that the upload path exits

      cb(null, fileDir);
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname
    );
  }
});

export { storage };