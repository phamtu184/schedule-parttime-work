const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const formatUsers = require("../common/formatUsers");

module.exports.getUser = async function (req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "bad request" });
  }
  const user = await User.findById(id).lean();
  if (!user) return res.status(500).json({ message: "user dosen't exist" });
  res.status(200).json(user);
};
module.exports.addUser = async function (req, res) {
  const { username, password, fullname, phonenumber, roles } = req.body;
  if (!username || !password || !fullname || !phonenumber || !roles) {
    return res.status(400).json({ message: "bad request" });
  }
  const user = await User.findOne({ username: username });
  if (user) return res.status(400).json({ message: "userExist" });
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return res.status(500).json({ message: "serverError" });
      const newUser = new User({
        username,
        password: hash,
        fullname,
        phonenumber,
        roles,
        avatar: "",
      });
      newUser
        .save()
        .then(res.status(200).json("addUserSuccess"))
        .catch((e) => res.status(500).json({ message: "serverError" }));
    });
  });
};

module.exports.getUsers = async function (req, res) {
  const { current, pageSize } = req.query;
  if (!current || !pageSize) {
    return res.status(400).json({ message: "bad request" });
  }
  const page = current - 1;
  const usersLength = await User.countDocuments();
  const users = await User.find()
    .select("-password -phonenumber")
    .lean()
    .limit(parseInt(pageSize))
    .skip(parseInt(page * pageSize));
  if (!users) return res.status(500).json({ message: "users is not exist" });
  res.status(200).json({ users: formatUsers(users), total: usersLength });
};
module.exports.searchUsers = async function (req, res) {
  const { fullname, roles, status, username } = req.body;
  const { current, pageSize } = req.query;
  if (!current || !pageSize) {
    return res.status(400).json({ message: "bad request" });
  }
  const page = current - 1;
  const query = [];
  if (!fullname && !roles && !status && !username)
    return res.status(400).json({ message: "request error" });
  if (fullname) {
    query.push({ fullname: { $regex: fullname, $options: "i" } });
  }
  if (status) {
    query.push({ disabled: status == "enable" ? false : true });
  }
  if (username) {
    query.push({ username: { $regex: username, $options: "i" } });
  }
  if (roles && roles.length > 0) {
    query.push({ roles: { $all: roles } });
  }
  const usersLength = await User.find({ $and: query }).countDocuments();
  const users = await User.find({ $and: query })
    .select("-password -phonenumber")
    .lean()
    .limit(parseInt(pageSize))
    .skip(parseInt(page * pageSize));
  res.status(200).json({ users: formatUsers(users), total: usersLength });
};

module.exports.deleteUsers = async function (req, res) {
  const query = Object.values(req.query);
  if (!query) {
    return res.status(400).json({ message: "bad request" });
  }
  User.deleteMany({ _id: { $in: query } })
    .then(() => res.status(200).json({ message: "delete success" }))
    .catch((e) => res.status(500).json({ message: "server error" }));
};

module.exports.modifyStatusUsers = async function (req, res) {
  const { enableAction, selectedRowKeys } = req.body;
  if (!selectedRowKeys) {
    return res.status(400).json({ message: "bad request" });
  }
  if (enableAction) {
    User.updateMany({ _id: { $in: selectedRowKeys } }, { disabled: false })
      .then(() => res.status(200).json({ message: "enable user success" }))
      .catch((e) => res.status(500).json({ message: "server error" }));
  } else {
    User.updateMany({ _id: { $in: selectedRowKeys } }, { disabled: true })
      .then(() => res.status(200).json({ message: "disable user success" }))
      .catch((e) => res.status(500).json({ message: "server error" }));
  }
};

module.exports.editUser = async function (req, res) {
  const { username, password, fullname, phonenumber, roles } = req.body;
  if (!username || !password || !fullname || !phonenumber || !roles) {
    return res.status(400).json({ message: "bad request" });
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return res.status(500).json({ message: "serverError" });
      User.findOneAndUpdate(
        { username },
        { password: hash, fullname, phonenumber, roles }
      )
        .then((rs) => {
          if (rs) return res.status(200).json("edit user success");
          return res.status(500).json({ message: "serverError" });
        })
        .catch((e) => res.status(500).json({ message: "serverError" }));
    });
  });
};
