const User = require("../models/user.model");
const Schedule = require("../models/schedule.model");
const { formatHours } = require("../common/times");
const formatSchedule = require("../common/formatSchedule");
const countTotalHours = require("../common/countTotalHours");

module.exports.createSchedule = async function (req, res) {
  const { date, shift, money } = req.body;
  if (!money || !date || !shift) {
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
  const newSchedule = Schedule({
    scheduleId: date,
    receptionist: formatSchedule(receptionist, "receptionist", shift),
    server: formatSchedule(server, "server", shift),
    cook: formatSchedule(cook, "cook", shift),
    shift,
    moneyReceptionist: money.moneyReceptionist,
    moneyServer: money.moneyServer,
    moneyCook: money.moneyCook,
  });
  newSchedule.save((err, schedule) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res
      .status(200)
      .json
      // {
      //   receptionist: formatSchedule(receptionist, "receptionist", shift),
      //   server: formatSchedule(server, "server", shift),
      //   cook: formatSchedule(cook, "cook", shift),
      //   title: schedule.scheduleId,
      //   money: {
      //     receptionist: schedule.moneyReceptionist,
      //     server: schedule.moneyServer,
      //     cook: schedule.moneyCook,
      //   },
      //   shift,
      // }
      ();
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
    shift,
    moneyReceptionist,
    moneyServer,
    moneyCook,
  } = scheduleValue;
  res.status(200).json({
    receptionist,
    server,
    cook,
    title: scheduleId,
    shift,
    money: {
      receptionist: moneyReceptionist,
      server: moneyServer,
      cook: moneyCook,
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

module.exports.userRegisterSchedule = async function (req, res) {
  const { title, item, money, shift } = req.body;
  if (!title || !item || !money || !shift) {
    return res.status(400).json({ message: "bad request" });
  }
  const place = item.key.slice(24, item.key.length);
  const totalHour = countTotalHours(item, shift);
  const newItem = { ...item, totalHour };
  Schedule.findOneAndUpdate(
    place === "receptionist"
      ? { scheduleId: title, "receptionist.key": item.key }
      : place === "server"
      ? { scheduleId: title, "server.key": item.key }
      : { scheduleId: title, "cook.key": item.key },
    place === "receptionist"
      ? { $set: { "receptionist.$": newItem } }
      : place === "server"
      ? { $set: { "server.$": newItem } }
      : { $set: { "cook.$": newItem } }
  )
    .then((rs) => {
      if (rs) return res.status(200).json({ message: "register success" });
      return res.status(500).json({ message: "uppdate fail" });
    })
    .catch((e) => {
      res.status(500).json({ message: "uppdate fail" });
    });
};

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
      shift,
      moneyReceptionist,
      moneyServer,
      moneyCook,
    } = scheduleCurrent;
    res.status(200).json({
      receptionist,
      server,
      cook,
      title: scheduleId,
      shift,
      money: {
        receptionist: moneyReceptionist,
        server: moneyServer,
        cook: moneyCook,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
