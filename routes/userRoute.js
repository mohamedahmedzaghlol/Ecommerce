//Import express
const express = require("express");
//Import userValidator
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator
} = require("../utils/validators/userValidator");
//Import services/userService.js
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword
} = require("../services/userService");

//Import router
const router = express.Router();

router.put("/changePassword/:id",changeUserPasswordValidator ,changeUserPassword);

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
