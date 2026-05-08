//Import slugify
const slugify = require("slugify");
//Import express-async-handler
const asyncHandler = require("express-async-handler");
//Import class ApiError
const ApiError = require("../utils/apiError");
//Import CategoryModel
const CategoryModel = require("../models/categoryModel");
//Import multer
// const multer = require("multer");
//Import uuid
const {v4: uuidv4} = require("uuid");

const path = require('path'); 
//Import sharp 
const sharp = require("sharp");

// Import uploadImageMiddleware
const {uploadSingleImage} = require("../middlewares/uploadImageMiddleware");



// 1- DiskStorage engine
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const fullPath = path.join(__dirname, '../uploads/categories');
//     cb(null, fullPath);
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split('/')[1];
//     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     cb(null, filename);
//   }
// });

//2- Memory storage 
// const multerStorage = multer.memoryStorage();

// 2- Check if the file upload --> it is image or file
// const multerFilter = function(req, file, cb) {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new ApiError("Only Images Allowed",404),false);
//   }
// };

// destination of Images
// const upload = multer({storage: multerStorage, fileFilter: multerFilter});

// Upload Single Image
exports.uploadCategoryImage = uploadSingleImage("image");
// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  // 1- لو مفيش ملف أصلاً، كمل للـ middleware اللي بعده ومتحاولش تعمل resize
  if (!req.file) return next();

  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  // حفظ اسم الصورة في الـ body عشان يتسيف في الداتابيز
  req.body.image = filename;

  next();
});

//exports.getCategories to use it in routes in categoryRoute.js
//express-async-handler & async & await
// @desc Get list of categories
// @route GET  http://localhost:3000/api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async(req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({result: categories.length,page ,data: categories});
});

//exports.getCategory to use it in routes in categoryRoute.js
//express-async-handler & async & await
// @desc Get Category By id
// @route GET  http://localhost:3000/api/v1/categories/:id
// @access Public
exports.getCategory = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    // //res.status(404).json({msg: `No category for this id ${id}`});
    return next(new ApiError(`No category for this id ${id}`,404));
  }
  res.status(200).json({data: category});
});

//createCategory to use it in routes in categoryRoute.js
// then & catch
// exports.createCategory = (req, res) => {
//   const name = req.body.name;
//   CategoryModel.create({ name, slug: slugify(name) })
//     .then((category) => {
//       res.status(201).json({ data: category });
//     })
//     .catch((err) => {
//       console.log(err); // السطر ده هو اللي هيخليك تشوف (TypeError: res.starus...) في الـ Terminal
//       // ابعت الـ message والـ status عشان تفهم الغلط في Postman
//       res.status(400).json({
//         status: "fail",
//         message: err.message, // ده هيعرض لك رسالة الـ Duplicate key
//         error: err,
//       });
//     });
// };

//exports.createCategory to use it in routes in categoryRoute.js
//express-async-handler & async & await
// @desc Create category
// @route POST  http://localhost:3000/api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async(req,res) => {
  const {name} = req.body;
  const category = await CategoryModel.create(req.body);
  res.status(201).json({data: category});
});

//exports.updateCategory to use it in routes in categoryRoute.js
//express-async-handler & async & await
// @desc Update category
// @route UPDATE  http://localhost:3000/api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  const {name} = req.body;
  const category = await CategoryModel.findOneAndUpdate(
    {_id: id},
    {name, slug: slugify(name),image: req.body.image},
    {new: true}
  );
  if (!category) {
    ////res.status(404).json({msg: `No category for this id ${id}`});
    return next(new ApiError(`No category for this id ${id}`,404));
  }
  res.status(200).json({data: category});
})

//exports.deleteCategory to use it in routes in categoryRoute.js
//express-async-handler & async & await
// @desc Delete category
// @route DELETE  http://localhost:3000/api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    ////res.status(404).json({msg: `No category fro this id ${id}`});
    return next(new ApiError(`No category for this id ${id}`,404));
  }
  res.status(204).send();
})
