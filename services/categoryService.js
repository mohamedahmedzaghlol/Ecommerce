//Import slugify
const slugify = require("slugify");
//Import express-async-handler
const asyncHandler = require("express-async-handler");
//Import class ApiError
const ApiError = require("../utils/apiError");
//Import CategoryModel
const CategoryModel = require("../models/categoryModel");

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
  const category = await CategoryModel.create({name, slug: slugify(name)});
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
    {name, slug: slugify(name)},
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