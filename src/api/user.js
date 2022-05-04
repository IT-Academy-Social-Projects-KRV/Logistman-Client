import axios from "axios";
import { SERVER_URL } from "../constants/url";

const URL = `${SERVER_URL}/User/`;

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

export class userService {
    static getUser() {
        return axios.get(URL + "user-info");
    }
}

export default userService;
