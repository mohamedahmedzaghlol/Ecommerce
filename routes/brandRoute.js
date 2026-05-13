//Import express
const express = require("express");
//Import categoryValidator
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");
//Import services/brandService.js
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../services/brandService");

// Import authService
const authService = require("../services/authService");

//Import router
const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(
    authService.protect,
    authService.allowTo("manager", "admin"),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand,
  );
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(
    authService.protect,
    authService.allowTo("manager", "admin"),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand,
  )
  .delete(
    authService.protect,
    authService.allowTo("admin"),
    deleteBrandValidator,
    deleteBrand,
  );

//Export router to use it in server.js
module.exports = router;
