import axios from "axios";
import { AUTHENTICATION_URLS, SERVER_URL } from "../constants/url";
import tokenService from "../services/token.service";
import store from "../index";
import { logout } from "../reduxActions/auth";
import { statusCode } from "../constants/statusCodes";

const instance = axios.create({
  baseURL: SERVER_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = tokenService.getLocalAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (responce) => {
    return responce;
  },
  async (error) => {
    if (error.response.status === statusCode.UNAUTHORIZED) {
      try {
        var modelAccessToken = tokenService.getLocalAccessToken();
        var modelRefreshToken = tokenService.getLocalRefrehsToken();

        var model = {
          token: modelAccessToken,
          refreshToken: modelRefreshToken,
        };

        var result = await instance.post(
          AUTHENTICATION_URLS.REFRESH_TOKEN,
          model
        );

        const newAccessToken = result.data.token;
        const newRefreshToken = result.data.refreshToken;

        tokenService.setLocalAccessToken(newAccessToken);
        tokenService.setLocalRefreshToken(newRefreshToken);

        return instance(error.config);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    if (
      error.response.status === statusCode.NOT_FOUND &&
      error.config.url == AUTHENTICATION_URLS.REFRESH_TOKEN
    ) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export default instance;
