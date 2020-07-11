const initialState = {
  fullname: "",
  id: "",
  roles: [],
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        fullname: action.payload.fullname,
        roles: action.payload.roles,
        id: action.payload.id,
      };
    }
    case "LOGOUT": {
      return initialState;
    }
    default:
      return state;
  }
};
export default authReducer;
