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
  resizeImage
} = require("../services/brandService");

//Import router
const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(uploadBrandImage,resizeImage,createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(uploadBrandImage,resizeImage,updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

//Export router to use it in server.js
module.exports = router;
