//Import express
const express = require("express");
//Import categoryValidator
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

//Import getCategories , createCategory from services/productService.js
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

// Import authService
const authService = require("../services/authService");

//Import router
const router = express.Router();
router
  .route("/")
  .get(getProducts)
  .post(
    authService.protect,
    authService.allowTo("manager", "admin"),
    createProductValidator,
    createProduct,
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    authService.protect,
    authService.allowTo("manager", "admin"),
    updateProductValidator,
    updateProduct,
  )
  .delete(
    authService.protect,
    authService.allowTo("admin"),
    deleteProductValidator,
    deleteProduct,
  );
//Export router to use it in server.js
module.exports = router;
