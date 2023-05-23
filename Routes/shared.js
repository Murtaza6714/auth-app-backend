const express = require("express");
const { Auth } = require('../Middlewares')
const { UserController, ProductController, AttendanceController  } = require("../Controllers/shared");
const { userValidators, productValidators } = require("../Request-Validators/shared");

const router = express.Router();

router.post("/login", userValidators.login, UserController.loginController);

router.get("/users", UserController.getAllUsers);

router.post("/add-user", userValidators.user, UserController.addUser)

router.patch('/update-user/:id', Auth ,userValidators.params, UserController.updateUser)

router.delete('/delete-user/:id', Auth ,userValidators.params, UserController.deleteUser)


module.exports = router;
