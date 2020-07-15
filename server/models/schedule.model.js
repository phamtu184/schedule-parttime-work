const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
  {
    scheduleId: {
      type: String,
      unique: true,
      required: true,
    },
    receptionist: [
      {
        key: String,
        isTile: Boolean,
        fullname: String,
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String,
        totalHour: Number,
      },
    ],
    server: [
      {
        key: String,
        isTile: Boolean,
        fullname: String,
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String,
        totalHour: Number,
      },
    ],
    cook: [
      {
        key: String,
        isTile: Boolean,
        fullname: String,
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String,
        totalHour: Number,
      },
    ],
    shift1: {
      type: [Number],
      required: true,
    },
    shift2: {
      type: [Number],
      required: true,
    },
    moneyReceptionist: {
      type: Number,
      required: true,
    },
    moneyServer: {
      type: Number,
      required: true,
    },
    moneyCook: {
      type: Number,
      required: true,
    },
    comment: [
      {
        content: String,
        ofUser: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
