//Import express-validator
// check ---> any thing such as param or body or query
const { check } = require("express-validator");
//Import validatorMiddleware.js
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

//Import CategoryValidator to use it in routes in categoryRoute.js

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid Category id format"),
  validatorMiddleware,
];
