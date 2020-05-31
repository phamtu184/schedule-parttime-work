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
  const rs = formatRegister(receptionist).concat(
    formatRegister(server),
    formatRegister(cook)
  );
  res.status(200).json({
    receptionist: formatRegister(receptionist),
    server: formatRegister(server),
    cook: formatRegister(cook),
  });
};
