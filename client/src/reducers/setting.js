const initialState = {
  isCollapsed: false,
  isThemeLight: true,
  language: "vi-vi",
};
const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SIDER": {
      return { ...state, isCollapsed: !state.isCollapsed };
    }
    case "CHANGE_LANGUAGE": {
      return { ...state, language: action.payload };
    }
    default:
      return state;
  }
};
export default settingReducer;
