//Import multer
const multer = require("multer");
//Import class ApiError
const ApiError = require("../utils/apiError");

//exports.uploadSingleImage to use it in categoryService.js
exports.uploadSingleImage = (fieldName) => {
  //2- Memory storage
  const multerStorage = multer.memoryStorage();

  // 2- Check if the file upload --> it is image or file
  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Images Allowed", 404), false);
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload.single(fieldName);
};
