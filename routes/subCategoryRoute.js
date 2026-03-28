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
  setCategoryIdToBody,
  createFilterObj
} = require("../services/subCategoryService");

//Import router
//mergeParams: Allow us to access parameters on other routes
// We need to access categoryId from category router
const router = express.Router({mergeParams: true});

router
  .route("/")
  .get(createFilterObj,getSubCategories)
  .post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator,updateSubCategory)
  .delete(deleteSubCategoryValidator,deleteSubCategory);
//Export router to use it in server.js
module.exports = router;
