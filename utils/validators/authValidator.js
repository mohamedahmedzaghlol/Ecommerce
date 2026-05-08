const  slugify  = require("slugify");
//Import express-validator
// check ---> any thing such as param or body or query
const { check } = require("express-validator");
//Import validatorMiddleware.js
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
//Import UserModel
const UserModel = require("../../models/userModel");


//Import userValidator to use it in routes in categoryRoute.js

exports.signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("User required")
    .isLength({ min: 3 })
    .withMessage("Too Short User name")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid Email address")
    .custom((val) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in use'));
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({min: 6})
    .withMessage("Password must be at least 6 characters")
    .custom((password, {req}) => {
      if (!req.body.passwordConfirm) {
        throw new Error("Password Confirmation is required with password");
      }
      if (password != req.body.passwordConfirm) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirmation required"),
  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid Email address"),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({min: 6})
    .withMessage("Password must be at least 6 characters"),
  validatorMiddleware
];