const formatUsers = (users) => {
  const rs = users.map((item) => {
    return {
      key: item.userId,
      avatar: item.avatar,
      username: item.username,
      fullname: item.fullname,
      roles: item.roles,
      status: item.disabled,
    };
  });
  return rs;
};
module.exports = formatUsers;
