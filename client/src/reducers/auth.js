const initialState = {
  username: "",
  role: 0,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      break;
    }
    case "LOGOUT": {
      break;
    }
    default:
      return state;
  }
};
export default authReducer;
