const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const formatUsers = require("../common/formatUsers");

module.exports.addUser = async function (req, res) {
  const { userId, username, password, fullname, phonenumber, roles } = req.body;
  const user = await User.findOne({
    $or: [{ userId: userId }, { username: username }],
  });
  if (user) return res.status(400).json({ message: "userExist" });
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return res.status(500).json({ message: "serverError" });
      const newUser = new User({
        userId,
        username,
        password: hash,
        fullname,
        phonenumber,
        roles,
      });
      newUser
        .save()
        .then(res.status(200).json("addUserSuccess"))
        .catch((e) => res.status(500).json({ message: "serverError" }));
    });
  });
};

module.exports.getUsers = async function (req, res) {
  const users = await User.find().select("-password -phonenumber").lean();
  if (!users) return res.status(500).json({ message: "users is not exist" });
  res.status(200).json(formatUsers(users));
};
module.exports.searchUsers = async function (req, res) {
  const { fullname, roles, status, userId, username } = req.body;
  const query = [];
  if (!fullname && !roles && !status && !userId && !username)
    return res.status(400).json({ message: "request error" });
  if (fullname) {
    query.push({ fullname: { $regex: fullname, $options: "i" } });
  }
  if (status) {
    query.push({ disabled: status == "enable" ? false : true });
  }
  if (userId) {
    query.push({ userId: { $regex: userId, $options: "i" } });
  }
  if (username) {
    query.push({ username: { $regex: username, $options: "i" } });
  }
  if (roles) {
    query.push({ roles: { $all: roles } });
  }
  const users = await User.find({ $and: query })
    .select("-password -phonenumber")
    .lean();
  res.status(200).json(formatUsers(users));
};
