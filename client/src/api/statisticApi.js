import axiosClient from "./axiosClient";

const statisticApi = {
  getUsers: (params) => {
    const url = "/api/statistic";
    return axiosClient.get(url, { params });
  },
};

export default statisticApi;
