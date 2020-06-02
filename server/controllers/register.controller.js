const User = require("../models/user.model");
const Register = require("../models/register.model");
const formatRegister = require("../common/formatRegister");
const checkWeek = require("../common/checkWeek");

module.exports.createRegisterSchedule = async function (req, res) {
  const { date } = req.body;
  if (!checkWeek(date))
    return res.status(400).json({ message: "registerForm has exist" });
  const registerForm = await Register.findOne({ registerId: date }).lean();
  if (registerForm)
    return res.status(400).json({ message: "registerForm has exist" });
  const cook = await User.find({
    roles: { $all: "cook" },
    disabled: false,
  }).select("-username -password -phonenumber -createdAt -updatedAt");
  const receptionist = await User.find({
    roles: { $all: "receptionist" },
    disabled: false,
  }).select("-username -password -phonenumber -createdAt -updatedAt");
  const server = await User.find({
    roles: { $all: "server" },
    disabled: false,
  }).select("-username -password -phonenumber -createdAt -updatedAt");
  const newRegister = Register({
    registerId: date,
    counter: formatRegister(receptionist),
    dinning: formatRegister(server),
    kitchen: formatRegister(cook),
  });
  newRegister.save((err, register) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.status(200).json({
      receptionist: formatRegister(receptionist),
      server: formatRegister(server),
      cook: formatRegister(cook),
      title: register.registerId,
    });
  });
};
module.exports.getRegisterSchedule = async function (req, res) {
  const { id } = req.query;
  const registerValue = await Register.findOne({ registerId: id });
  const { counter, dinning, kitchen, registerId } = registerValue;
  res.status(200).json({
    receptionist: counter,
    server: dinning,
    cook: kitchen,
    title: registerId,
  });
};
module.exports.getRegisterLazily = async function (req, res) {
  const registers = await Register.find().select("registerId");
  const rs = registers.map((item) => {
    const split = item.registerId.split("-");
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
