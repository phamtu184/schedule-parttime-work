const formatSchedule = (users, string) => {
  const rs = users.map((item) => {
    return {
      key: item.userId + string,
      fullname: item.fullname,
      isTitle: false,
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    };
  });
  return rs;
};
module.exports = formatSchedule;
