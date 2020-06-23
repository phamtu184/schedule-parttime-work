var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const registerSettingController = require("../controllers/registerSetting.controller");
const registerUserControler = require("../controllers/registerUser.controller");

// auth
router.get("/auth", authController.getProfile);
router.post("/auth", authController.login);
/* user  */
router.get("/user", userController.getUser);
router.post("/user", userController.addUser);
router.put("/user", userController.editUser);
/* users  */
router.get("/users", userController.getUsers);
router.post("/users", userController.searchUsers);
router.delete("/users", userController.deleteUsers);
router.put("/users", userController.modifyStatusUsers);
// register setting schedule
router.post(
  "/registersetting",
  registerSettingController.createRegisterSchedule
);
router.get("/registersetting", registerSettingController.getRegisterSchedule);
router.delete(
  "/registersetting",
  registerSettingController.deleteRegisterSchedule
);
router.put("/registersetting", registerSettingController.putRegisterSchedule);
router.get("/registerlazily", registerSettingController.getRegisterLazily);
// register schedule for user
router.get("/registeruser", registerUserControler.getRegisterUser);

module.exports = router;
