//Import express
const express = require("express");

//Import subCategoryValidator
const {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator
} = require("../utils/validators/subCategoryValidator");

//Import subCategoryService.js
const {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryService");
//Import router
const router = express.Router();

router
  .route("/")
  .get(getSubCategories)
  .post(createSubCategoryValidator, createSubCategory);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator,updateSubCategory)
  .delete(deleteSubCategoryValidator,deleteSubCategory);
//Export router to use it in server.js
module.exports = router;
