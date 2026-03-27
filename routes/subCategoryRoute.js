//Import express
const express = require("express");
//Import subCategoryValidator
const {createSubCategoryValidator} = require("../utils/validators/subCategoryValidator");
//Import createSubCategory from services/subCategoryService.js
const { createSubCategory } = require("../services/subCategoryService");
//Import router
const router = express.Router();

router.route("/").post(createSubCategoryValidator,createSubCategory);

//Export router to use it in server.js
module.exports = router;
