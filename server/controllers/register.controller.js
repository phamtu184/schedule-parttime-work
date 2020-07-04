const Schedule = require("../models/schedule.model");
const countTotalHours = require("../common/countTotalHours");

module.exports.getRegisterSchedule = async function (req, res) {
  try {
    const scheduleCurrent = await Schedule.findOne({ isRegister: true }).lean();
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
  } catch (e) {
    console.log(e);
  }
};
module.exports.userRegisterSchedule = async function (req, res) {
  const { title, item, infoTitle } = req.body;
  const place = item.key.slice(24, item.key.length);
  const totalHour = countTotalHours(item, infoTitle);
  const newItem = { ...item, totalHour };
  Schedule.findOneAndUpdate(
    place === "counter"
      ? { scheduleId: title, "counter.key": item.key }
      : place === "dinning"
      ? { scheduleId: title, "dinning.key": item.key }
      : { scheduleId: title, "kitchen.key": item.key },
    place === "counter"
      ? { $set: { "counter.$": newItem } }
      : place === "dinning"
      ? { $set: { "dinning.$": newItem } }
      : { $set: { "kitchen.$": newItem } }
  )
    .then((rs) => res.status(200).json({ message: "register success" }))
    .catch((e) => console.log(e));
};
