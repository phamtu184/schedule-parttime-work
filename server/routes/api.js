var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const scheduleController = require("../controllers/schedule.controller");
const statisticController = require("../controllers/statistic.controller");

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
// schedule
router.post("/schedule", scheduleController.createSchedule);
router.get("/schedule", scheduleController.getSchedule);
router.delete("/schedule", scheduleController.deleteSchedule);
router.put("/schedule", scheduleController.userRegisterSchedule);
router.get("/schedulelazily", scheduleController.getScheduleLazily);
router.get("/mainschedule", scheduleController.getMainSchedule);
// Statistic
router.post("/statistic", statisticController.postStatistic);
module.exports = router;
