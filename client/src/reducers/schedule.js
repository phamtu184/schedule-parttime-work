const initialState = {
  dataSource: [],
  title: "",
};
const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_SCHEDULE": {
      return {
        ...state,
        dataSource: action.payload.data,
        title: action.payload.title,
      };
    }
    case "DELETE_SCHEDULE": {
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
export default scheduleReducer;
