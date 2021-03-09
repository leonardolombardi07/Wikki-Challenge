import axios from "axios";
// Services
import * as LocalStorage from "../../storage/LocalStorage";

const commonConfigs = {
  baseURL: "https://api.github.com",
  headers: {
    "content-type": "application/json",
  },
};

export const WikkiApi = axios.create({
  ...commonConfigs,
});

export const WikkiApiWithAuth = axios.create({
  ...commonConfigs,
});

WikkiApiWithAuth.interceptors.request.use(
  (config) => {
    const access_token = LocalStorage.getAccessToken();
    if (access_token) {
      config.headers.Authorization = access_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
