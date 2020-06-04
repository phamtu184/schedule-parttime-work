export const createRegister = (payload) => {
  return {
    type: "CREATE_REGISTER",
    payload,
  };
};
export const deleteRegister = (payload) => {
  return {
    type: "DELETE_REGISTER",
    payload,
  };
};
