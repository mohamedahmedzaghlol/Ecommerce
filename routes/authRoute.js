//Import express
const express = require("express");
//Import authValidator
const {signupValidator} = require("../utils/validators/authValidator");
//Import services/authService.js
const {signup} = require("../services/authService");
//Import router
const router = express.Router();

router.route("/signup").post(signupValidator,signup);

//Export router to use it in server.js
module.exports = router;

