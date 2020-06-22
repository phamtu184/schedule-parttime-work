export const roleAdmin = (roles) => {
  if (roles.indexOf("admin") > -1) {
    return true;
  }
  return false;
};
export const roleManager = (roles) => {
  if (roles.indexOf("admin") > -1 || roles.indexOf("manager") > -1) {
    return true;
  }
  return false;
};
