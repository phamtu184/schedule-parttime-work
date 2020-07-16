import axiosClient from "./axiosClient";

const statisticApi = {
  postStatistic: (data, params) => {
    const url = "/api/statistic";
    return axiosClient.post(url, data, { params });
  },
};

export default statisticApi;
