var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const scheduleController = require('../controllers/schedule.controller')

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
router.post("/registerschedule", scheduleController.createRegisterSchedule);
module.exports = router;
