const initialState = {
  dataSource: [],
  title: "",
  shift1: "",
  shift2: "",
  moneyPerHour: "",
};
const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_SCHEDULE": {
      return {
        ...state,
        dataSource: action.payload.data,
        title: action.payload.title,
        shift1: action.payload.shift1,
        shift2: action.payload.shift1,
        moneyPerHour: action.payload.moneyPerHour,
      };
    }
    case "DELETE_SCHEDULE": {
      return {
        ...state,
        dataSource: [],
        title: "",
        shift1: "",
        shift2: "",
        moneyPerHour: "",
      };
    }
    default:
      return state;
  }
};
export default scheduleReducer;
