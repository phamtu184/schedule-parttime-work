const initialState = {
  fullname: "",
  roles: [],
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { fullname: action.payload.fullname, roles: action.payload.roles };
    }
    case "LOGOUT": {
      return { fullname: "", roles: [] };
    }
    default:
      return state;
  }
};
export default authReducer;
