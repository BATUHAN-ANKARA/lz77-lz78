const express = require("express");
const controller = require("../controllers/index");
const router = express.Router();
// const userValidator = require('../validations/index')

router.post("/createUser", controller.userController.createUser);
router.post("/login", controller.userController.login);
router.get("/getUserById/:id", controller.userController.getUserById);
router.get("/getUserByName/:name", controller.userController.getUserByName);
router.put("/updateUser/:id", controller.userController.updateUser);
router.put("/updatePassword/:id", controller.userController.updatePassword);
router.put("/updateProfilePhoto/:id", controller.userController.updateProfilePhoto);
router.get("/getAllUsers", controller.userController.getAllUsers);
module.exports = {
  user: router,
};