const initialState = {
  fullname: "",
  role: [],
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { fullname: action.payload.fullname, role: action.payload.roles };
    }
    case "LOGOUT": {
      return { fullname: "", role: [] };
    }
    default:
      return state;
  }
};
export default authReducer;
