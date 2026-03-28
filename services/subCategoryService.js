//Import slugify
const slugify = require("slugify");
//Import express-async-handler
const asyncHandler = require("express-async-handler");
//Import class ApiError
const ApiError = require("../utils/apiError");
//Import subCategoryModel
const subCategoryModel = require("../models/subCategoryModel");

//Nest Routes
exports.createFilterObj = (req,res,next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = {category: req.params.categoryId}
  req.filterObj = filterObject;
  next();
}

//exports.getSubCategories to use it in routes in subCategoryRoute.js
//express-async-handler & async & await
// @desc Get list of SubCategories
// @route GET http://localhost:3000/api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler(async(req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await subCategoryModel.find(req.filterObj).skip(skip).limit(limit);
  res.status(200).json({result: subCategories.length,page ,data: subCategories});
});

//exports.getSubCategory to use it in routes in subCategoryRoute.js
//express-async-handler & async & await
// @desc Get subCategory By id
// @route GET  http://localhost:3000/api/v1/subcategories/:id
// @access Public
exports.getSubCategory = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  const subCategory = await subCategoryModel.findById(id);
  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`,404));
  }
  res.status(200).json({data: subCategory});
});

//exports.setCategoryIdToBody to use it in routes in subCategoryRoute.js
exports.setCategoryIdToBody = (req,res,next) => {
  //Nested route
  if(!req.body.category) req.body.category = req.params.categoryId;
  next();
};

//exports.createSubCategory to use it in routes in subCategoryRoute.js
//express-async-handler & async & await
// @desc Create SubCategory
// @route POST  //http://localhost:3000/api/v1/subcategories
// @access Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  //

  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory});
});

//exports.updateSubCategory to use it in routes in subCategoryRoute.js
//express-async-handler & async & await
// @desc Update SubCategory
// @route UPDATE  http://localhost:3000/api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  const {name,category} = req.body;
  const subCategory = await subCategoryModel.findOneAndUpdate(
    {_id: id},
    {name, slug: slugify(name),category},
    {new: true}
  );
  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`,404));
  }
  res.status(200).json({data: subCategory});
})

//exports.deleteSubCategory to use it in routes in subCategoryRoute.js
//express-async-handler & async & await
// @desc Delete subCategory
// @route DELETE  http://localhost:3000/api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  const subCategory = await subCategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`,404));
  }
  res.status(204).send();
})