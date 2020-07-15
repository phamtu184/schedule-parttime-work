const Schedule = require("../models/schedule.model");

module.exports.getMainSchedule = async function (req, res) {
  try {
    const scheduleCurrent = await Schedule.findOne()
      .sort({ _id: -1 })
      .limit(1)
      .lean();
    if (!scheduleCurrent)
      return res.status(400).json({ message: "cannot find any colection" });
    const {
      receptionist,
      server,
      cook,
      scheduleId,
      shift1,
      shift2,
      moneyReceptionist,
      moneyServer,
      moneyCook,
    } = scheduleCurrent;
    res.status(200).json({
      receptionist,
      server,
      cook,
      title: scheduleId,
      shift1,
      shift2,
      moneyReceptionist,
      moneyServer,
      moneyCook,
    });
  } catch (e) {
    console.log(e);
  }
};
