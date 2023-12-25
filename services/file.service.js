const utils = require("../utils/index");
const upload = require("../middlewares/index");
const multer = require("multer");

exports.uploadImage = (req, res) => {
  return new Promise((resolve, reject) => {
    upload.singleImageUploadMiddleware(req, res, async (err) => {
      if (err) {
        reject(err);
      }
      const ip = await utils.helper.getHost();
      const filePath = process.env.FILE_PATH;
      const fileName = req.file.filename;
      const fileString = `${ip}${filePath}${fileName}`;
      resolve(fileString);
    });
  });
};

exports.uploadImageMultiple = (req, res) => {
  return new Promise((resolve, reject) => {
    upload.multipleImageuploadMiddleware(req, res, async (err) => {
      if (err) {
        reject(err);
      }
      const ip = await utils.helper.getHost();
      const filePath = process.env.FILE_PATH;
      const fileString = req.files.map((file) => {
        const fileName = file.filename
        return `${ip}${filePath}${fileName}`
      })
      resolve(fileString);
    });
  });
};