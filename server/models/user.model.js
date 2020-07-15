const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    roles: [{ type: String }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
