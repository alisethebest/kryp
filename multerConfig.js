const path = require('path')
var multer = require('multer');
const fs = require('fs')
//multer.diskStorage() creates a storage space for storing files.
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    const parts = file.originalname.split('.');
    const fileExtension = parts[parts.length - 1];
    const uniqueFilename = `${Date.now()}.${fileExtension}`;
    cb(null, uniqueFilename);
  },
});
var upload = multer({storage:storage});
module.exports = upload;