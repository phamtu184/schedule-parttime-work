import axiosClient from "./axiosClient";

const statisticApi = {
  postStatistic: (data) => {
    const url = "/api/statistic";
    return axiosClient.post(url, data);
  },
};

export default statisticApi;
