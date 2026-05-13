// Import crypto
const crypto = require("crypto");
// Import jsonwebtoken
const jwt = require("jsonwebtoken");
// Import bcryptjs
const bcrypt = require("bcryptjs");
//Import express-async-handler
const asyncHandler = require("express-async-handler");
//Import class ApiError
const ApiError = require("../utils/apiError");
//Import sendEmail
const sendEmail = require("../utils/sendEmail");
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

//adesc Authorization (User Permissions)
// ["admin","manager"]
exports.allowTo = (...roles) => 
  asyncHandler(async(req,res,next) => {
    // 1- access roles
    // 2- access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(new ApiError("You are not allowed to access this route",403));
    }
    next();
  });

//exports.forgotPassword to use it in routes in authRoute.js
//express-async-handler & async & await
// @desc Forgot Password
// @route POST  http://localhost:3000/api/v1/auth/forgotPassword
// @access Public
exports.forgotPassword = asyncHandler(async(req,res,next) => {
  // 1- Get user by email
  const user = await UserModel.findOne({email: req.body.email});
  if (!user) {
    return next(new ApiError(`There is no user with that email ${req.body.email}`,404));
  }
  // 2- If user exist, Generate reset random 6 digits and save it DB
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashResetCode = crypto.createHash("sha256").update(resetCode).digest("hex");
  //  Save Hash Password Reset Code into DB
  user.passwordResetCode = hashResetCode;
  // Add expiration time for Hash Password Reset Code (10 minutes)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();

  const message = `Hi ${user.name},\n We received a request to reset the password on your CMS Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The CMS Team`;

    // 3- Send the reset code via email
    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset code (valid for 10 min)",
        message
      });
    } catch (err) {
      user.passwordResetCode = undefined,
      user.passwordResetExpires = undefined,
      user.passwordResetVerified = undefined,

      await user.save();
      return next(new ApiError("There is an error in sending email",500));
    }

    res.status(200).json({status: "Success", message: "Reset code sent email"});
});