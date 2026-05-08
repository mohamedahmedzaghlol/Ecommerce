// Import mongoose
const mongoose = require("mongoose");
//Import bcryptjs
const bcrypt = require("bcryptjs");
// 3- Create userSchema
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
      select: false
    },
    passwordChangedAt: Date,
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

// الـ Global Solution لإخفاء الباسورد من أي Response
// -----------------------------------------------------------
const setTransform = (doc, ret) => {
  delete ret.password; // بيضمن إن الباسورد يتمسح حتى لو اتعمله Create أو Save
  return ret;
};

userSchema.set("toJSON", { transform: setTransform });
userSchema.set("toObject", { transform: setTransform });

// 5- Hashing user Password before Saving in Data Base
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  // Hashing user password
  this.password = await bcrypt.hash(this.password,12);
});

// 6- Create model
const UserModel = mongoose.model('User', userSchema);

// 7- Export UserModel to use it in services in userService.js
module.exports = UserModel;