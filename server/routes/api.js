var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

// auth
router.get("/auth", authController.getProfile);
router.post("/auth", authController.login);
/* user  */
router.post("/user", userController.addUser);
/* users  */
router.get("/users", userController.getUsers);
router.post("/users", userController.searchUsers);

module.exports = router;
