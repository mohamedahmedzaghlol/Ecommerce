// Import jsonwebtoken
const jwt = require("jsonwebtoken");
//Import express-async-handler
const asyncHandler = require("express-async-handler");
//Import class ApiError
const ApiError = require("../utils/apiError");
// Import UserModel
const UserModel = require("../models/userModel");

//exports.signup to use it in routes in authRoute.js
//express-async-handler & async & await
// @desc Signup
// @route POST  http://localhost:3000/api/v1/auth/signup
// @access Private
exports.signup = asyncHandler(async(req,res,next) => {
  // 1- Create user
  const user = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  // 2- Generate token
  const token = jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRE_TIME
  });
  res.status(201).json({data: user, token});
})