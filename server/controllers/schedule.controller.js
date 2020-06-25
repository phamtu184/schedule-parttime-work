const User = require("../models/user.model");
const Schedule = require("../models/schedule.model");
const formatSchedule = require("../common/formatSchedule");
const checkWeek = require("../common/checkWeek");

module.exports.createSchedule = async function (req, res) {
  const { date } = req.body;
  if (!checkWeek(date))
    return res.status(400).json({ message: "ScheduleForm has exist" });
  const scheduleForm = await Schedule.findOne({ registerId: date })
    .lean()
    .exec();
  if (scheduleForm)
    return res.status(400).json({ message: "ScheduleForm has exist" });
  const cook = await User.find({
    roles: { $all: "cook" },
    disabled: false,
  })
    .select("-username -password -phonenumber -createdAt -updatedAt")
    .exec();
  const receptionist = await User.find({
    roles: { $all: "receptionist" },
    disabled: false,
  })
    .select("-username -password -phonenumber -createdAt -updatedAt")
    .exec();
  const server = await User.find({
    roles: { $all: "server" },
    disabled: false,
  })
    .select("-username -password -phonenumber -createdAt -updatedAt")
    .exec();
  const newSchedule = Schedule({
    scheduleId: date,
    counter: formatSchedule(receptionist, "receptionist"),
    dinning: formatSchedule(server, "server"),
    kitchen: formatSchedule(cook, "cook"),
  });
  newSchedule.save((err, schedule) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.status(200).json({
      receptionist: formatSchedule(receptionist, "receptionist"),
      server: formatSchedule(server, "server"),
      cook: formatSchedule(cook, "cook"),
      title: schedule.scheduleId,
    });
  });
};
module.exports.getSchedule = async function (req, res) {
  const { id } = req.query;
  const scheduleValue = await Schedule.findOne({ scheduleId: id }).exec();
  const { counter, dinning, kitchen, scheduleId } = scheduleValue;
  res.status(200).json({
    receptionist: counter,
    server: dinning,
    cook: kitchen,
    title: scheduleId,
  });
};
module.exports.getScheduleLazily = async function (req, res) {
  const schedules = await Schedule.find().select("scheduleId").exec();
  const rs = schedules.map((item) => {
    const split = item.scheduleId.split("-");
    return {
      value: split[0],
      children: split[1],
    };
  });
  let output = [];
  rs.forEach(function (item) {
    var existing = output.filter(function (v, i) {
      return v.value == item.value;
    });
    if (existing.length) {
      var existingIndex = output.indexOf(existing[0]);
      output[existingIndex].children = output[existingIndex].children.concat(
        item.children
      );
    } else {
      if (typeof item.children == "string") item.children = [item.children];
      output.push(item);
    }
  });
  const result = output.map((item) => {
    return {
      value: item.value,
      label: item.value,
      children: item.children.map((i) => {
        return {
          label: i,
          value: item.value + "-" + i,
        };
      }),
    };
  });
  res.json(result);
};
module.exports.deleteSchedule = async function (req, res) {
  const id = req.query[0];
  Schedule.findOneAndDelete({ scheduleId: id })
    .then(() =>
      res.status(200).json({ message: "delete Schedule form success" })
    )
    .catch((e) => res.status(500).json({ message: "server error" }));
};
module.exports.putSchedule = async function (req, res) {
  const id = req.body.title;
  Schedule.updateOne({ isMain: true }, { isMain: false })
    .then(() => {
      Schedule.updateOne({ scheduleId: id }, { isMain: true }).then(() =>
        res.status(200).json({ message: "update success" })
      );
    })
    .catch((e) => res.status(500).json({ message: "uppdate fail" }));
};

module.exports.getScheduleUser = async function (req, res) {
  const scheduleCurrent = await Schedule.findOne({ isMain: true }).exec();
  if (!scheduleCurrent)
    return res.status(400).json({ message: "cannot find any colection" });
  const { counter, dinning, kitchen, scheduleId } = scheduleCurrent;
  res.status(200).json({
    receptionist: counter,
    server: dinning,
    cook: kitchen,
    title: scheduleId,
  });
};
