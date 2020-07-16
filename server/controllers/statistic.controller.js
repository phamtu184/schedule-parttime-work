const Schedule = require("../models/schedule.model");
const User = require("../models/user.model");

module.exports.postStatistic = async function (req, res) {
  const idUsers = req.query.params;
  const { week1, week2 } = req.body;
  if (!req.body || !idUsers)
    return res.status(500).json({ message: "bad request" });
  const scheduleList = await Schedule.find({
    scheduleId: { $in: getWeekList(week1, week2) },
  })
    .select("-createdAt -updatedAt")
    .lean();
  const userList = await User.find({ _id: { $in: idUsers } })
    .select("-password -phonenumber -disabled -avatar -createdAt -updatedAt")
    .lean();
  console.log(userList);
};
function getWeekList(week1, week2) {
  const listWeek = [];
  if (week2.year === week1.year) {
    for (let i = week1.week; i <= week2.week; i++) {
      listWeek.push(`${week1.year}-${i}`);
    }
  }
  if (week2.year > week1.year) {
    for (let i = week1.week; i <= week1.weeksInYear; i++) {
      listWeek.push(`${week1.year}-${i}`);
    }
    for (let j = 1; j <= week2.week; j++) {
      listWeek.push(`${week2.year}-${j}`);
    }
  }
  return listWeek;
}
function getMoneyWeek(userList) {}
