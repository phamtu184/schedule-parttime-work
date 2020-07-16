module.exports.cook = (roles) => {
  if (roles.indexOf("cook") > -1) {
    return true;
  }
  return false;
};
module.exports.server = (roles) => {
  if (roles.indexOf("server") > -1) {
    return true;
  }
  return false;
};
module.exports.receptionist = (roles) => {
  if (roles.indexOf("receptionist") > -1) {
    return true;
  }
  return false;
};
