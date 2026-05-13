//Import express
const express = require("express");
//Import userValidator
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
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
  changeUserPassword,
} = require("../services/userService");

// Import authService
const authService = require("../services/authService");

//Import router
const router = express.Router();

router.put(
  "/changePassword/:id",
  authService.protect,
  changeUserPasswordValidator,
  changeUserPassword,
);

router
  .route("/")
  .get(authService.protect, authService.allowTo("manager", "admin"), getUsers)
  .post(
    authService.protect,
    authService.allowTo("admin"),
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser,
  );
router
  .route("/:id")
  .get(
    authService.protect,
    authService.allowTo("admin"),
    getUserValidator,
    getUser,
  )
  .put(
    authService.protect,
    authService.allowTo("admin"),
    uploadUserImage,
    resizeImage,
    updateUserValidator,
    updateUser,
  )
  .delete(
    authService.protect,
    authService.allowTo("admin"),
    deleteUserValidator,
    deleteUser,
  );

//Export router to use it in server.js
module.exports = router;
