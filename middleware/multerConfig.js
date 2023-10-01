const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb vaneko callback
    // logic to validate (mime type ) file type
    const allowFileTypes = ["image/png", "image/jpg"];
    
    if (allowFileTypes.includes(file.mimetype)) {
      cb(new Error("invalid File type only supports jpg and png"));
    return;
    }

    cb(null, "./uploads/");  // c(a,b) =>success
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = {
  multer,
  storage,
};
