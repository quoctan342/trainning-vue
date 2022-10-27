import axios from "axios";
import store from "@/store";
const axiosClient = axios.create({
  baseURL: "https://icanhazdadjoke.com/",
  headers: {
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    store.commit("SET_LOADING", true);
    console.log(store.state.is_loading);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    store.commit("SET_LOADING", false);
    console.log(store.state.is_loading);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const get = async (api: string, params: object) => {
  const request = await axiosClient.get(api, params);
  if (request.data) {
    return request.data;
  }
  return request;
};

export default axiosClient;
