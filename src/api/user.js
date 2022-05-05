import axios from "axios";
import { USER_URL } from "../constants/url";
import "./configurations";

export default class userService {
    static getUser() {
        return axios.get(USER_URL + "user-info");
    }
}
