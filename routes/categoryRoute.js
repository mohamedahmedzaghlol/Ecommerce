//Import express
const express = require('express');
//Import getCategories , createCategory from services/categoryService.js
const { 
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../services/categoryService");
//Import router 
const router = express.Router();
//===========================================
// router.get("/", getCategories);
// router.post("/", createCategory);
//============================================
// The best way (Refactor)
router.route("/").get(getCategories).post(createCategory);
router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);
//Export router to use it in server.js
module.exports = router;