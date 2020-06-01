var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const registerController = require("../controllers/register.controller");

// auth
router.get("/auth", authController.getProfile);
router.post("/auth", authController.login);
/* user  */
router.get("/user", userController.getUser);
router.post("/user", userController.addUser);
/* users  */
router.get("/users", userController.getUsers);
router.post("/users", userController.searchUsers);
router.delete("/users", userController.deleteUsers);
router.put("/users", userController.modifyStatusUsers);
// schedule
router.post("/registerschedule", registerController.createRegisterSchedule);
router.get("/registerschedule", registerController.getRegisterSchedule);
router.get("/registerlazily", registerController.getRegisterLazily);
module.exports = router;
