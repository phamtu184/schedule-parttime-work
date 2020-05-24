const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

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
