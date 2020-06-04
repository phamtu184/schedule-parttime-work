const initialState = {
  dataSource: [],
  title: "",
};
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_REGISTER": {
      return {
        ...state,
        dataSource: action.payload.data,
        title: action.payload.title,
      };
    }
    case "DELETE_REGISTER": {
      return {
        ...state,
        dataSource: [],
        title: "",
      };
    }
    default:
      return state;
  }
};
export default registerReducer;
