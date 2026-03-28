// Import mongoose
const mongoose = require("mongoose");
// 1- Create brandSchema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short Brand name"],
      maxlength: [32, "Too long Brand name"],
    },
    slug: {
      type: String,
      lowercase: true
    },
    image: String
  },
  { timestamps: true },
);

// 2- Create model
const BrandModel = mongoose.model('Brand', brandSchema);

//Export BrandModel to use it in services in brandService.js
module.exports = BrandModel;
