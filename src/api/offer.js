import axios from "axios";
import { SERVER_URL } from "../constants/url";

const URL = `${SERVER_URL}/Offer/`;

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

export default class offerService {
    static createOffer(model) {
        console.log(model)
        return axios.post(URL + "create", model);
    }
}
