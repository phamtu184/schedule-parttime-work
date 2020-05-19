const initialState = {
  isCollapsed: false,
  isThemeLight: true,
};
const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SIDER": {
      return { ...state, isCollapsed: !state.isCollapsed };
    }
    case "TOGGLE_THEME": {
      return { ...state, isThemeLight: !state.isThemeLight };
    }
    default:
      return state;
  }
};
export default settingReducer;
