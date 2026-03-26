//Import express
const express = require("express");
//Import categoryValidator
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

//Import getCategories , createCategory from services/categoryService.js
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
//Import router
const router = express.Router();
//===========================================
// router.get("/", getCategories);
// router.post("/", createCategory);
//============================================
// The best way (Refactor)
router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
//Export router to use it in server.js
module.exports = router;
