function checkPrivateRoles(roles) {
  if (roles.indexOf("manager") > -1 || roles.indexOf("storeManager") > -1) {
    return true;
  }
  return false;
}
export default checkPrivateRoles;
