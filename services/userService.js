//Import slugify
const slugify = require("slugify");
//Import express-async-handler
const asyncHandler = require("express-async-handler");
//Import class ApiError
const ApiError = require("../utils/apiError");
//Import userModel
const UserModel = require("../models/userModel");

//Import uuid
const { v4: uuidv4 } = require("uuid");

const path = require("path");
//Import sharp
const sharp = require("sharp");

// Import uploadImageMiddleware
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
// Upload Single Image
exports.uploadUserImage = uploadSingleImage("profileImg");
// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);

    //Save image into our DB
    req.body.profileImg = filename;
  }

  next();
});

//exports.getUsers to use it in routes in userRoute.js
//express-async-handler & async & await
// @desc Get list of users
// @route GET  http://localhost:3000/api/v1/users
// @access Private
exports.getUsers = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const users = await UserModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: users.length, page, data: users });
});

//exports.getUser to use it in routes in userRoute.js
//express-async-handler & async & await
// @desc Get User By id
// @route GET  http://localhost:3000/api/v1/users/:id
// @access Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return next(new ApiError(`No user for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});

//exports.createUser to use it in routes in userRoute.js
//express-async-handler & async & await
// @desc Create user
// @route POST  http://localhost:3000/api/v1/users
// @access Private
exports.createUser = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const user = await UserModel.create(req.body);
  res.status(201).json({ data: user });
});

//exports.updateUser to use it in routes in userRoute.js
//express-async-handler & async & await
// @desc Update user
// @route UPDATE  http://localhost:3000/api/v1/users/:id
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true },
  );
  if (!user) {
    return next(new ApiError(`No user for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});

//exports.deleteUser to use it in routes in userRoute.js
//express-async-handler & async & await
// @desc Delete user
// @route DELETE  http://localhost:3000/api/v1/users/:id
// @access Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) {
    return next(new ApiError(`No user for this id ${id}`, 404));
  }
  res.status(204).send();
});
