//Import express
const express = require("express");
//Import authValidator
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");
//Import services/authService.js
const { 
  signup,
  login,
  forgotPassword
} = require("../services/authService");
//Import router
const router = express.Router();

router.route("/signup").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);
router.route("/forgotPassword").post(forgotPassword);

//Export router to use it in server.js
module.exports = router;
