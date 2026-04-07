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
exports.getProducts = asyncHandler(async (req, res) => {
  // 1) Filtering
  const queryStringObj = { ...req.query };
  const excludesFields = ["page", "sort", "limit", "fields", "keyword"];
  excludesFields.forEach((field) => delete queryStringObj[field]);

  let queryStr = JSON.stringify(queryStringObj);

  // أولاً: بنحول gte لـ $gte
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // ثانياً: بنصلح الأقواس لو موجودة ونحولها لشكل Object
  // دي اللي هتحول 'ratingsAverage[gte]' لشكل يفهمه المونجو
  // eslint-disable-next-line prefer-const
  let finalQuery = JSON.parse(queryStr);

  // تريك إضافية عشان نضمن إن الـ Nested Objects تفك صح
  Object.keys(finalQuery).forEach((key) => {
    if (key.includes("[")) {
      const mainKey = key.split("[")[0]; // ratingsAverage
      const op = key.split("[")[1].replace("]", ""); // $gte
      finalQuery[mainKey] = { [op]: finalQuery[key] };
      delete finalQuery[key];
    }
  });

  console.log("Final Mongo Query:", finalQuery);

  // 2) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;

  // Build Query
  let mongooseQuery = ProductModel.find(finalQuery)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });

  // 3) Sorting
  if (req.query.sort) {
    // "price,sold" -> "price sold"
    const sortBy = req.query.sort.split(",").join(" ");
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else {
    mongooseQuery = mongooseQuery.sort("-createdAt");
  }

  // 4) Fields Limiting
  if (req.query.fields) {
    // title,ratingsAverage,imageCover,price
    const fields = req.query.fields.split(",").join(" ");
    // title ratingsAverage imageCover price
    mongooseQuery = mongooseQuery.select(fields);
  }

  // 5) Search
  if (req.query.keyword) {
    let query = {};
    query.$or = [
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
    mongooseQuery = mongooseQuery.find(query);
  }

  // Execute Query
  const products = await mongooseQuery;
  res.status(200).json({ result: products.length, page, data: products });
});


//exports.getProduct to use it in routes in productRoute.js
//express-async-handler & async & await
// @desc Get product By id
// @route GET  http://localhost:3000/api/v1/products/:id
// @access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (!product) {
    // //res.status(404).json({msg: `No product for this id ${id}`});
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

//exports.createProduct to use it in routes in productRoute.js
//express-async-handler & async & await
// @desc Create product
// @route POST  http://localhost:3000/api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.create(req.body);
  res.status(201).json({ data: product });
});

//exports.updateProduct to use it in routes in productRoute.js
//express-async-handler & async & await
// @desc Update Product
// @route UPDATE  http://localhost:3000/api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

//exports.deleteProduct to use it in routes in productRoute.js
//express-async-handler & async & await
// @desc Delete product
// @route DELETE  http://localhost:3000/api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(204).send();
});
