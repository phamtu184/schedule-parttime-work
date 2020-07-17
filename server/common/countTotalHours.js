const countTotalHours = (item, shiftNum, shift) => {
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
module.exports = countTotalHours;
