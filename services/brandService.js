//Import slugify
const slugify = require("slugify");
//Import express-async-handler
const asyncHandler = require("express-async-handler");
//Import class ApiError
const ApiError = require("../utils/apiError");
//Import BrandModel
const BrandModel = require("../models/brandModel");

//exports.getBrands to use it in routes in brandRoute.js
//express-async-handler & async & await
// @desc Get list of brands
// @route GET  http://localhost:3000/api/v1/brands
// @access Public
exports.getBrands = asyncHandler(async(req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await BrandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({result: brands.length,page ,data: brands});
});

//exports.getBrand to use it in routes in brandRoute.js
//express-async-handler & async & await
// @desc Get Brand By id
// @route GET  http://localhost:3000/api/v1/brands/:id
// @access Public
exports.getBrand = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  const brand = await BrandModel.findById(id);
  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`,404));
  }
  res.status(200).json({data: brand});
});

//exports.createBrand to use it in routes in brandRoute.js
//express-async-handler & async & await
// @desc Create brand
// @route POST  http://localhost:3000/api/v1/brands
// @access Private
exports.createBrand = asyncHandler(async(req,res) => {
  const {name} = req.body;
  const brand = await BrandModel.create({name, slug: slugify(name)});
  res.status(201).json({data: brand});
});

//exports.updateBrand to use it in routes in brandRoute.js
//express-async-handler & async & await
// @desc Update brand
// @route UPDATE  http://localhost:3000/api/v1/brands/:id
// @access Private
exports.updateBrand = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  const {name} = req.body;
  const brand = await BrandModel.findOneAndUpdate(
    {_id: id},
    {name, slug: slugify(name)},
    {new: true}
  );
  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`,404));
  }
  res.status(200).json({data: brand});
})

//exports.deleteBrand to use it in routes in brandRoute.js
//express-async-handler & async & await
// @desc Delete brand
// @route DELETE  http://localhost:3000/api/v1/brands/:id
// @access Private
exports.deleteBrand = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  const brand = await BrandModel.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`,404));
  }
  res.status(204).send();
})