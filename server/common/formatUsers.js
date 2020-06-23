const formatUsers = (users) => {
  const rs = users.map((item) => {
    return {
      _id: item._id,
      key: item._id,
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
