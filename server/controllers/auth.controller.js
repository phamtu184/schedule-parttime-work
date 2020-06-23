const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.login = async function (req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    return res.status(400).json({ message: "user dosen't exist" });
  }
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "wrong password" });
  }
  if (user.disabled) {
    return res.status(400).json({ message: "account is disable" });
  }
  jwt.sign(
    {
      id: user._id,
      fullname: user.fullname,
      roles: user.roles,
      disabled: user.disabled,
    },
    process.env.JWTSECRET,
    { expiresIn: 1000 * 60 * 60 * 24 },
    (err, token) => {
      if (err) return res.status(500).json({ message: "Lỗi server" });
      res
        .status(200)
        .json({ token, fullname: user.fullname, roles: user.roles });
    }
  );
};
module.exports.getProfile = function (req, res) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
      if (err) return res.status(400).json({ message: "Token expired" });
      if (decoded.disabled)
        return res.status(500).json({ message: "account is disable" });
      return res.status(200).json(decoded);
    });
  }
};
