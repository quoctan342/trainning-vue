import axios from 'axios';
import store from '@/store';
const axiosClient = axios.create({
    baseURL: 'https://icanhazdadjoke.com/',
    headers: {
        Accept: 'application/json',
    },
});
axiosClient.interceptors.request.use(
    function (config) {
        store.commit('SET_LOADING', true);
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        store.commit('SET_LOADING', false);

        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);
export const get = async (api: string, params: object) => {
    const request = await axiosClient.get(api, params);
    if (request.data) {
        return request.data;
    }

    return request;
};

export default axiosClient;
