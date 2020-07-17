module.exports.formatHours = (shift) => {
  const rs = shift.map((item) => {
    return {
      start: item[0].hours(),
      end: item[1].hours(),
    };
  });
  console.log(rs);
};
