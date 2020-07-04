const initialState = {
  dataSource: [],
  title: "",
  infoTitle: {
    shift1: [],
    shift2: [],
    money: 0,
  },
};
const mainScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_MAIN_SCHEDULE": {
      return {
        ...state,
        dataSource: action.payload.data,
        title: action.payload.title,
        infoTitle: action.payload.infoTitle,
      };
    }
    case "SET_MAIN_SCHEDULE": {
      return {
        ...state,
        dataSource: action.payload.data,
      };
    }
    case "DELETE_MAIN_SCHEDULE": {
      return initialState;
    }
    default:
      return state;
  }
};
export default mainScheduleReducer;
