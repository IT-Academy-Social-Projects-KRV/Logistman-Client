import axios from "axios";
import { SERVER_URL } from "../constants/url";

const URL = `${SERVER_URL}/Point/`;

axios.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default class pointService {
    static createPoint(model) {
        return axios.post(URL + "create", model);
    }
}
