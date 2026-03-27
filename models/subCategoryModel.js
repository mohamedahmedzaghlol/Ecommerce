// Import mongoose
const mongoose = require('mongoose');
// 1- Create subCategorySchema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory must be unique"],
      minlength: [2, "Too short SubCategory name"],
      maxlength: [32, "Too long SubCategory name"]
    },
    slug: {
      type: String,
      lowercase: true
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"]
    }
  },
  {timestamps: true} 
);

// 2- Create subCategoryModel
const subCategoryModel = mongoose.model('SubCategory', subCategorySchema);

//Export subCategoryModel to use it in services in categoryService.js
module.exports = subCategoryModel;