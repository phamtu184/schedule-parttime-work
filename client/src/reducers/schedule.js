const initialState = {
  dataSource: [],
  title: "",
  infoTitle: {
    shift1: [],
    shift2: [],
    money: 0,
  },
};
const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_SCHEDULE": {
      return {
        ...state,
        dataSource: action.payload.data,
        title: action.payload.title,
        infoTitle: action.payload.infoTitle,
      };
    }
    case "SET_SCHEDULE": {
      return {
        ...state,
        dataSource: action.payload.data,
      };
    }
    case "DELETE_SCHEDULE": {
      return initialState;
    }
    default:
      return state;
  }
};
export default scheduleReducer;
