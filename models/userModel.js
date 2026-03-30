// Import mongoose
const mongoose = require("mongoose");
// 1- Create userSchema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,
    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "Too short password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// 2- Create model
const UserModel = mongoose.model('User', userSchema);

//Export UserModel to use it in services in userService.js
module.exports = UserModel;