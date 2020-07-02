import axiosClient from "./axiosClient";

const userApi = {
  getUsers: (params) => {
    const url = "/api/users";
    return axiosClient.get(url, { params });
  },
  searchUsers: (data, params) => {
    const url = "/api/users";
    return axiosClient.post(url, data, { params });
  },
  deleteUsers: (params) => {
    const url = "/api/users";
    return axiosClient.delete(url, { params });
  },
  enableUsers: (data) => {
    const url = "/api/users";
    return axiosClient.put(url, data);
  },
  getUser: (params) => {
    const url = "/api/user";
    return axiosClient.get(url, { params });
  },
  addUser: (body) => {
    const url = "/api/user";
    return axiosClient.post(url, body);
  },
  editUser: (body) => {
    const url = "/api/user";
    return axiosClient.put(url, body);
  },
};

export default userApi;
