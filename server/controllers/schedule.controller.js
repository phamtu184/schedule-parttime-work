const User = require("../models/user.model");
const Schedule = require("../models/schedule.model");
const formatSchedule = require("../common/formatSchedule");

module.exports.createSchedule = async function (req, res) {
  const { date, shift1, shift2, money } = req.body;
  if (!money || !date || !shift1 || !shift2) {
    return res.status(400).json({ message: "bad request" });
  }
  const scheduleForm = await Schedule.findOne({ scheduleId: date })
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
  const infoTitle = { shift1, shift2 };
  const newSchedule = Schedule({
    scheduleId: date,
    receptionist: formatSchedule(receptionist, "receptionist", infoTitle),
    server: formatSchedule(server, "server", infoTitle),
    cook: formatSchedule(cook, "cook", infoTitle),
    shift1,
    shift2,
    moneyReceptionist: money.moneyReceptionist,
    moneyServer: money.moneyServer,
    moneyCook: money.moneyCook,
  });
  newSchedule.save((err, schedule) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.status(200).json({
      receptionist: formatSchedule(receptionist, "receptionist", infoTitle),
      server: formatSchedule(server, "server", infoTitle),
      cook: formatSchedule(cook, "cook", infoTitle),
      title: schedule.scheduleId,
      infoTitle: {
        shift1: schedule.shift1,
        shift2: schedule.shift2,
        moneyReceptionist: schedule.moneyReceptionist,
        moneyServer: schedule.moneyServer,
        moneyCook: schedule.moneyCook,
      },
    });
  });
};
module.exports.getSchedule = async function (req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "bad request" });
  }
  const scheduleValue = await Schedule.findOne({ scheduleId: id }).exec();
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
  } = scheduleValue;
  res.status(200).json({
    receptionist,
    server,
    cook,
    title: scheduleId,
    infoTitle: {
      shift1,
      shift2,
      moneyReceptionist,
      moneyServer,
      moneyCook,
    },
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
  const id = req.query.title;
  if (!id) {
    return res.status(400).json({ message: "bad request" });
  }
  Schedule.findOneAndDelete({ scheduleId: id })
    .then((rs) => {
      if (rs)
        return res
          .status(200)
          .json({ message: "delete Schedule form success" });
      return res.status(500).json({ message: "server error" });
    })
    .catch((e) => {
      return res.status(500).json({ message: "server error" });
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
