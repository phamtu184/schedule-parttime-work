const formatSchedule = (users, string) => {
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
  return rs;
};
module.exports = formatSchedule;
