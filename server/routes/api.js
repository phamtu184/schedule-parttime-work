var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

// auth
router.get("/auth", authController.getProfile);
router.post("/auth", authController.login);
/* GET users listing. */
router.post("/user", userController.addUser);

module.exports = router;
