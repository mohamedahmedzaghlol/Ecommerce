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

//Import subCategoryRoute
const subCategoryRoute = require("./subCategoryRoute");

//Import router
const router = express.Router();

//Nested Routes
//http://localhost:3000/api/v1/categories/69c7bf0d16373fac88251ee8/subcategories
router.use("/:categoryId/subcategories",subCategoryRoute);
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
