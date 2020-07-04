const countTotalHours = (item, infoTitle) => {
  const { shift1, shift2, money } = infoTitle;
  const rs1 = (shift1[1] * 60 - shift1[0] * 60) / 60;
  const rs2 = (shift2[1] * 60 - shift2[0] * 60) / 60;
  let rs = 0;
  Object.keys(item).forEach((key) => {
    if (item[key] === "shift1") {
      rs += rs1;
    }
    if (item[key] === "shift2") {
      rs += rs2;
    }
    if (item[key] === "all") {
      rs += rs1 + rs2;
    }
  });
  return rs;
};
module.exports = countTotalHours;
