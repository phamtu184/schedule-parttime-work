const formatRegister = (users) => {
  const rs = users.map((item) => {
    return {
      key: item.userId,
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
module.exports = formatRegister;
