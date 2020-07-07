const Schedule = require("../models/schedule.model");
const countTotalHours = require("../common/countTotalHours");

module.exports.userRegisterSchedule = async function (req, res) {
  const { title, item, infoTitle } = req.body;
  if (!title || !item || !infoTitle) {
    return res.status(400).json({ message: "bad request" });
  }
  const place = item.key.slice(24, item.key.length);
  const totalHour = countTotalHours(item, infoTitle);
  const newItem = { ...item, totalHour };
  console.log(place);
  Schedule.findOneAndUpdate(
    place === "receptionist"
      ? { scheduleId: title, "counter.key": item.key }
      : place === "server"
      ? { scheduleId: title, "dinning.key": item.key }
      : { scheduleId: title, "kitchen.key": item.key },
    place === "receptionist"
      ? { $set: { "counter.$": newItem } }
      : place === "server"
      ? { $set: { "dinning.$": newItem } }
      : { $set: { "kitchen.$": newItem } }
  )
    .then((rs) => {
      if (rs) return res.status(200).json({ message: "register success" });
      return res.status(500).json({ message: "uppdate fail" });
    })
    .catch((e) => {
      res.status(500).json({ message: "uppdate fail" });
    });
};
module.exports.putToMainSchedule = async function (req, res) {
  const id = req.body.title;
  if (!id) {
    return res.status(400).json({ message: "bad request" });
  }
  Schedule.updateOne({ isMain: true }, { isMain: false })
    .then(() => {
      Schedule.updateOne({ scheduleId: id }, { isMain: true })
        .then((rs) => {
          if (rs) return res.status(200).json({ message: "update success" });
          return res.status(500).json({ message: "uppdate fail" });
        })
        .catch((e) => res.status(500).json({ message: "uppdate fail" }));
    })
    .catch((e) => res.status(500).json({ message: "uppdate fail" }));
};

module.exports.getMainSchedule = async function (req, res) {
  try {
    const scheduleCurrent = await Schedule.findOne({ isMain: true }).lean();
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
