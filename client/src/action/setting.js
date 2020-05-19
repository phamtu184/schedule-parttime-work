export const toggleSider = (payload) => {
  return {
    type: "TOGGLE_SIDER",
    payload,
  };
};
export const toggleTheme = (payload) => {
  return {
    type: "TOGGLE_THEME",
    payload,
  };
};
export const changeThemeColor = (payload) => {
  return {
    type: "CHANGE_THEME_COLOR",
    payload,
  };
};
