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
    default:
      return state;
  }
};
export default registerReducer;
