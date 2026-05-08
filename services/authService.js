// Import jsonwebtoken
const jwt = require("jsonwebtoken");
// Import bcryptjs
const bcrypt = require("bcryptjs");
//Import express-async-handler
const asyncHandler = require("express-async-handler");
//Import class ApiError
const ApiError = require("../utils/apiError");
// Import UserModel
const UserModel = require("../models/userModel");
// Genereate token
const generateToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME
  });
};

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
  const token = generateToken(user._id);
  res.status(201).json({data: user, token});
})

//exports.login to use it in routes in authRoute.js
//express-async-handler & async & await
// @desc Login
// @route POST  http://localhost:3000/api/v1/auth/login
// @access Public
exports.login = asyncHandler(async(req,res,next) => {
  // 1- Check if user exist & Check if email and password is correct
  const user = await UserModel.findOne({email: req.body.email}).select("+password");
  if (!user || !(await bcrypt.compare(req.body.password,user.password))) {
    return next(new ApiError("Incorrect email and password",401));
  }
  // 2- Generate token
  const token = generateToken(user._id);
  res.status(200).json({data: user, token});
});

//exports.protect to use it in routes in categoryRoute.js
//express-async-handler & async & await
// @desc Protect Routes
// @route POST  
// @access Public
exports.protect = asyncHandler(async(req,res,next) => {
  // 1- Check if token exist, if exist get it
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    
    token= req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("You are not login, Please login to get access this route",401));
  }
  // 2- Verify token (no change happen and expires token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3- Check if user exist
  const currentUser = await UserModel.findById(decoded.userId);
  if (!currentUser) {
    return next(new ApiError("The user that belong to this token does no longer exist",401));
  }
  // 4- Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimeStamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimeStamp > decoded.iat) {
      return next(new ApiError("User recently changed his password. please login again..",401));
    }
  }

  req.user = currentUser;
  next();
});