const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "storage/thumbnails");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    return cb(null, uniqueSuffix + "-" + file.fieldname);
  },
});

const upload = multer({ storage });

module.exports = upload;
