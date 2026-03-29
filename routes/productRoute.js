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

//Import router
const router = express.Router();
router
  .route("/")
  .get(getProducts)
  .post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);
//Export router to use it in server.js
module.exports = router;
