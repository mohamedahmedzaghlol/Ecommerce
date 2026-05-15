//Import express
const express = require("express");
//Import userValidator
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator
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
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData
} = require("../services/userService");

// Import authService
const authService = require("../services/authService");

//Import router
const router = express.Router();

router.use(authService.protect);

router.get("/getMe",getLoggedUserData,getUser);
router.put("/changeMyPassword",updateLoggedUserPassword);
router.put("/updateMe",updateLoggedUserValidator,updateLoggedUserData);
router.delete("/deleteMe",deleteLoggedUserData);

// Admin
router.use(authService.allowTo("manager", "admin"));

router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword,
);

router
  .route("/")
  .get(getUsers)
  .post(
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser,
  );
router
  .route("/:id")
  .get(
    getUserValidator,
    getUser,
  )
  .put(
    uploadUserImage,
    resizeImage,
    updateUserValidator,
    updateUser,
  )
  .delete(
    deleteUserValidator,
    deleteUser,
  );

//Export router to use it in server.js
module.exports = router;
