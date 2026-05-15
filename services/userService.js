//Import slugify
const slugify = require("slugify");
//Import express-async-handler
const asyncHandler = require("express-async-handler");
//Import class ApiError
const ApiError = require("../utils/apiError");
// Import generateToken
const generateToken = require("../utils/generateToken");
//Import userModel
const UserModel = require("../models/userModel");

//Import uuid
const { v4: uuidv4 } = require("uuid");
//Import bcryptjs
const bcrypt = require("bcryptjs");

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
  ////const { name } = req.body;
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
      profileImg: req.body.profileImg,
      role: req.body.role
    },
    { new: true },
  );
  if (!user) {
    return next(new ApiError(`No user for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});

//exports.changeUserPassword to use it in routes in userRoute.js
//express-async-handler & async & await
// @desc changeUserPassword
// @route UPDATE  http://localhost:3000/api/v1/users/changePassword/:id
// @access Private
exports.changeUserPassword = asyncHandler(async(req,res,next) => {
  const { id } = req.params;
  const user = await UserModel.findOneAndUpdate(
    { _id: id},
    { password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now()
    },
    { new: true}
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

//exports.getLoggedUserData to use it in routes in userRoute.js
//express-async-handler & async & await
// @desc Get User By id
// @route GET  http://localhost:3000/api/v1/users/getMe
// @access Private/protect
exports.getLoggedUserData = asyncHandler(async(req,res,next) => {
  req.params.id = req.user._id;
  next();
});

//exports.updateLoggedUserPassword to use it in routes in userRoute.js
//express-async-handler & async & await
// @desc Update Logged User Password
// @route PUT  http://localhost:3000/api/v1/users/changeMyPassword
// @access Private/protect
exports.updateLoggedUserPassword = asyncHandler(async(req,res,next) => {
  // 1- Update user password based user payload (req.user._id)
    const user = await UserModel.findOneAndUpdate(
    req.user._id,
    { 
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now()
    },
    { new: true}
  );

  // 2- Generate Token
  const token = generateToken(user._id);
  res.status(200).json({data: user, token});
});

//exports.updateLoggedUserData to use it in routes in userRoute.js
//express-async-handler & async & await
// @desc Update Logged User Data
// @route PUT  http://localhost:3000/api/v1/users/updateMe
// @access Private/protect
exports.updateLoggedUserData = asyncHandler(async(req,res,next) => {
  // 1- Update user data based user payload (req.user._id)
  const updateUser = await UserModel.findOneAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    },
    {new: true}
  );
  res.status(200).json({data: updateUser});
});

//exports.deleteLoggedUserData to use it in routes in userRoute.js
//express-async-handler & async & await
// @desc Deactive logged user
// @route DELETE  http://localhost:3000/api/v1/users/deleteMe
// @access Private/protect
exports.deleteLoggedUserData = asyncHandler(async(req,res,next) => {
  await UserModel.findOneAndUpdate(
    req.user._id,
    {active: false}
  );
  res.status(204).json({status: "Success"});
});