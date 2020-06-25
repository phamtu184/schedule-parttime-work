export const createSchedule = (payload) => {
  return {
    type: "CREATE_SCHEDULE",
    payload,
  };
};
export const deleteSchedule = (payload) => {
  return {
    type: "DELETE_SCHEDULE",
    payload,
  };
};
