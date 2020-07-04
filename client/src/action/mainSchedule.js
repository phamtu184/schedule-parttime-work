export const createSchedule = (payload) => {
  return {
    type: "CREATE_MAIN_SCHEDULE",
    payload,
  };
};
export const setSchedule = (payload) => {
  return {
    type: "SET_MAIN_SCHEDULE",
    payload,
  };
};
export const deleteSchedule = (payload) => {
  return {
    type: "DELETE_MAIN_SCHEDULE",
    payload,
  };
};
