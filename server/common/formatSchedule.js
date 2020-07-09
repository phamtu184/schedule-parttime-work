const countTotalHours = require("./countTotalHours");
const shift = ["shift1", "shift2", "off"];
const formatSchedule = (users, string, infoTitle) => {
  let current = 0;
  const rs = users.map((item) => {
    return {
      key: item._id + string,
      fullname: item.fullname,
      isModify: false,
      isTitle: false,
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
      totalHour: 0,
    };
  });
  for (let i = 0; i < rs.length; i++) {
    rs[i].monday = shift[numProblem(current)];
    current++;
  }
  for (let i = 0; i < rs.length; i++) {
    rs[i].tuesday = shift[numProblem(current)];
    current++;
  }
  for (let i = 0; i < rs.length; i++) {
    rs[i].wednesday = shift[numProblem(current)];
    current++;
  }
  for (let i = 0; i < rs.length; i++) {
    rs[i].thursday = shift[numProblem(current)];
    current++;
  }
  for (let i = 0; i < rs.length; i++) {
    rs[i].friday = shift[numProblem(current)];
    current++;
  }
  for (let i = 0; i < rs.length; i++) {
    rs[i].saturday = shift[numProblem(current)];
    current++;
  }
  for (let i = 0; i < rs.length; i++) {
    rs[i].sunday = shift[numProblem(current)];
    current++;
  }
  for (let i = 0; i < rs.length; i++) {
    rs[i].totalHour = countTotalHours(rs[i], infoTitle);
  }
  return rs;
};
function numProblem(index) {
  if (index < shift.length) {
    return index;
  }
  return dequyNum(index);
}
function dequyNum(ts) {
  if (ts - shift.length < shift.length) {
    return ts - shift.length;
  }
  return dequyNum(ts - shift.length);
}
module.exports = formatSchedule;
