import axiosClient from "./axiosClient";

const scheduleApi = {
  getMainSchedule: () => {
    const url = "/api/mainschedule";
    return axiosClient.get(url);
  },
  getSchedule: (params) => {
    const url = "/api/schedule";
    return axiosClient.get(url, { params });
  },
  createSchedule: (body) => {
    const url = "/api/schedule";
    return axiosClient.post(url, body);
  },
  getScheduleLazily: () => {
    const url = "/api/schedulelazily";
    return axiosClient.get(url);
  },
  deleteSchedule: (params) => {
    const url = "/api/schedule";
    return axiosClient.delete(url, { params });
  },
  userRegisterSchedule: (body) => {
    const url = "/api/schedule";
    return axiosClient.put(url, body);
  },
};

export default scheduleApi;
