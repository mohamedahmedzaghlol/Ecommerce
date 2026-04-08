//Import express
const express = require("express");
//Import userValidator
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/userValidator");
//Import services/brandService.js
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage
} = require("../services/userService");

//Import router
const router = express.Router();

router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage,resizeImage, createUserValidator,createUser);
router
  .route("/:id")
  .get(getUserValidator,getUser)
  .put(uploadUserImage,resizeImage, updateUserValidator,updateUser)
  .delete(deleteUserValidator,deleteUser);

//Export router to use it in server.js
module.exports = router;
