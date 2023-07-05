import axios from "axios";

let url = import.meta.env.VITE_APP_API_URL;

axios.defaults.baseURL = url;
const api = axios.create({
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    Promise.reject(err);
  }
);

export { api, url };
