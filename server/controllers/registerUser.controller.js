const User = require("../models/user.model");
const Register = require("../models/register.model");

module.exports.getRegisterUser = async function (req, res) {
  const registerCurrent = await Register.findOne({ isMain: true }).exec();
  if (!registerCurrent)
    return res.status(400).json({ message: "cannot find any colection" });
  const { counter, dinning, kitchen, registerId } = registerCurrent;
  res.status(200).json({
    receptionist: counter,
    server: dinning,
    cook: kitchen,
    title: registerId,
  });
};
