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
    if (store.state.reqPending === 0) {
      store.commit("SET_LOADING", true);
    }
    store.commit("REQUEST_PENDING_ADD");

    return config;
  },
  function (error) {
    store.commit("REQUEST_PENDING_DONE");

    if (store.state.reqPending === 0) {
      store.commit("SET_LOADING", false);
    }

    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    store.commit("REQUEST_PENDING_DONE");

    if (store.state.reqPending === 0) {
      store.commit("SET_LOADING", false);
    }

    return response;
  },
  function (error) {
    store.commit("REQUEST_PENDING_DONE");

    if (store.state.reqPending === 0) {
      store.commit("SET_LOADING", false);
    }

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
