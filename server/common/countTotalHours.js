const countTotalHours = (item, shiftNum) => {
  const shift = totalShift(shiftNum);
  const totalShiftHours = shiftNum.map((it) => {
    return (it.end * 60 - it.start * 60) / 60;
  });
  let rs = 0;
  Object.keys(item).forEach((key) => {
    for (let i = 0; i < shift.length - 1; i++) {
      if (item[key] === shift[i]) {
        rs += totalShiftHours[i];
      }
    }
  });
  return rs;
};
const totalShift = (shift) => {
  const total = [];
  for (let i = 1; i <= shift.length; i++) {
    total.push("shift" + i);
  }
  total.push("off");
  return total;
};
module.exports = countTotalHours;
