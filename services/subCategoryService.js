//Import slugify
const slugify = require("slugify");
//Import express-async-handler
const asyncHandler = require("express-async-handler");
//Import class ApiError
const ApiError = require("../utils/apiError");
//Import subCategoryModel
const subCategoryModel = require("../models/subCategoryModel");

//exports.createSubCategory to use it in routes in subCategoryRoute.js
//express-async-handler & async & await
// @desc Create SubCategory
// @route POST  http://localhost:3000/api/v1/subCategory
// @access Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory});
});
