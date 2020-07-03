const Schedule = require("../models/schedule.model");

module.exports.getRegisterSchedule = async function (req, res) {
  const scheduleCurrent = await Schedule.findOne({ isRegister: true }).exec();
  if (!scheduleCurrent)
    return res.status(400).json({ message: "cannot find any colection" });
  const {
    counter,
    dinning,
    kitchen,
    scheduleId,
    shift1,
    shift2,
    moneyPerHour,
  } = scheduleCurrent;
  res.status(200).json({
    receptionist: counter,
    server: dinning,
    cook: kitchen,
    title: scheduleId,
    shift1,
    shift2,
    moneyPerHour,
  });
};
module.exports.userRegisterSchedule = async function (req, res) {
  const { title, item } = req.body;
  console.log(title, item);
  //Schedule.findOneAndUpdate({})
};
