//Import slugify
const slugify = require("slugify");
//Import express-async-handler
const asyncHandler = require("express-async-handler");
//Import class ApiError
const ApiError = require("../utils/apiError");
//Import ProductModel
const ProductModel = require("../models/productModel");

//exports.getProducts to use it in routes in productRoute.js
//express-async-handler & async & await
// @desc Get list of products
// @route GET  http://localhost:3000/api/v1/products
// @access Public
exports.getProducts = asyncHandler(async(req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({}).skip(skip).limit(limit);
  res.status(200).json({result: products.length,page ,data: products});
});

//exports.getProduct to use it in routes in productRoute.js
//express-async-handler & async & await
// @desc Get product By id
// @route GET  http://localhost:3000/api/v1/products/:id
// @access Public
exports.getProduct = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  const product = await ProductModel.findById(id);
  if (!product) {
    // //res.status(404).json({msg: `No product for this id ${id}`});
    return next(new ApiError(`No product for this id ${id}`,404));
  }
  res.status(200).json({data: product});
});

//exports.createProduct to use it in routes in productRoute.js
//express-async-handler & async & await
// @desc Create product
// @route POST  http://localhost:3000/api/v1/products
// @access Private
exports.createProduct = asyncHandler(async(req,res) => {
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.create(req.body);
  res.status(201).json({data: product});
});

//exports.updateProduct to use it in routes in productRoute.js
//express-async-handler & async & await
// @desc Update Product
// @route UPDATE  http://localhost:3000/api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.findOneAndUpdate(
    {_id: id},
    req.body,
    {new: true}
  );
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`,404));
  }
  res.status(200).json({data: product});
})

//exports.deleteProduct to use it in routes in productRoute.js
//express-async-handler & async & await
// @desc Delete product
// @route DELETE  http://localhost:3000/api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(async(req,res,next) => {
  const {id} = req.params;
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`,404));
  }
  res.status(204).send();
})