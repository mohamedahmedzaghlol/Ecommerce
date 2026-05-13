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
  uploadCategoryImage,
  resizeImage,
} = require("../services/categoryService");

//Import subCategoryRoute
const subCategoryRoute = require("./subCategoryRoute");

// Import authService
const authService = require("../services/authService");

//Import router
const router = express.Router();

//Nested Routes
//http://localhost:3000/api/v1/categories/69c7bf0d16373fac88251ee8/subcategories
router.use("/:categoryId/subcategories", subCategoryRoute);
//===========================================
// router.get("/", getCategories);
// router.post("/", createCategory);
//============================================
// The best way (Refactor)
router
  .route("/")
  .get(getCategories)
  .post(
    authService.protect,
    authService.allowTo("manager", "admin"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory,
  );
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(
    authService.protect,
    authService.allowTo("manager", "admin"),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory,
  )
  .delete(
    authService.protect,
    authService.allowTo("admin"),
    deleteCategoryValidator,
    deleteCategory,
  );

//Export router to use it in server.js
module.exports = router;
