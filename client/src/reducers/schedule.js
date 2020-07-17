const initialState = {
  dataSource: [],
  title: "",
  money: {
    receptionist: 0,
    server: 0,
    cook: 0,
  },
  shift: [],
};
const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_SCHEDULE": {
      return {
        ...state,
        dataSource: action.payload.data,
        title: action.payload.title,
        money: action.payload.money,
        shift: action.payload.shift,
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
