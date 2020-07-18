const Schedule = require("../models/schedule.model");
const User = require("../models/user.model");
const checkRole = require("../common/checkRoles");

module.exports.postStatistic = async function (req, res) {
  const { week1, week2, usersId } = req.body;
  const { current, pageSize } = req.query;
  if (!req.body || !usersId)
    return res.status(500).json({ message: "bad request" });
  const userList = await User.find({ _id: { $in: usersId } })
    .select("-password -phonenumber -createdAt -updatedAt")
    .lean()
    .limit(parseInt(pageSize))
    .skip(parseInt((current - 1) * pageSize));
  const scheduleList = await Schedule.find({
    scheduleId: { $in: getWeekList(week1, week2) },
  })
    .select("-createdAt -updatedAt")
    .lean();

  return res.status(200).json(resultList(userList, scheduleList));
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
function getMoneyWeek(user, scheduleList) {
  let totalHour = 0;
  let totalMoney = 0;
  for (let i = 0; i < scheduleList.length; i++) {
    try {
      if (checkRole.cook(user.roles)) {
        totalHour += scheduleList[i].cook.find(
          (e) => e.userId.toString() == user._id
        ).totalHour;
        totalMoney +=
          scheduleList[i].cook.find((e) => e.userId.toString() == user._id)
            .totalHour * scheduleList[i].moneyCook;
      }
      if (checkRole.server(user.roles)) {
        totalHour += scheduleList[i].server.find(
          (e) => e.userId.toString() == user._id
        ).totalHour;
        totalMoney +=
          scheduleList[i].server.find((e) => e.userId.toString() == user._id)
            .totalHour * scheduleList[i].moneyServer;
      }
      if (checkRole.receptionist(user.roles)) {
        totalHour += scheduleList[i].receptionist.find(
          (e) => e.userId.toString() == user._id
        ).totalHour;
        totalMoney +=
          scheduleList[i].receptionist.find(
            (e) => e.userId.toString() == user._id
          ).totalHour * scheduleList[i].moneyReceptionist;
      }
    } catch {
      totalHour = 0;
      totalMoney = 0;
    }
  }
  return { totalHour, totalMoney };
}
function resultList(userList, scheduleList) {
  const rs = userList.map((item) => {
    const { totalHour, totalMoney } = getMoneyWeek(item, scheduleList);
    return {
      _id: item._id,
      key: item._id,
      avatar: item.avatar,
      username: item.username,
      fullname: item.fullname,
      roles: item.roles,
      status: item.disabled,
      totalHour,
      totalMoney,
    };
  });
  return rs;
}
