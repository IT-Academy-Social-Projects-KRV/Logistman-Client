import { AUTHENTICATION_URLS } from "../constants/url";
import instance from "./configurations";

export default class authenticationService {
    static registerUser(model) {
        return instance.post(AUTHENTICATION_URLS.REGISTRATION, model);
    }

    static loginUser(model) {
        return instance.post(AUTHENTICATION_URLS.LOGIN, model);
    }

    static logoutUser(model) {
        return instance.post(AUTHENTICATION_URLS.LOGOUT, model);
    }
}
