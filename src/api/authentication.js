import axios from "axios";
import { SERVER_URL } from "../constants/url";

const URL = `${SERVER_URL}/Authentication/`;

export default class authenticationService {

    static registerUser(model) {
        return axios.post(URL + 'register', model);
    }
}
