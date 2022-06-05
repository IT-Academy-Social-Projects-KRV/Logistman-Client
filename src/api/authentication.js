import instance from "./configurations/configurations";
import { AUTHENTICATION_URLS } from "../constants/api/urls";

export default class authenticationService {
    static register(model) {
        return instance.post(AUTHENTICATION_URLS.REGISTRATION, model);
    }

    static login(model) {
        return instance.post(AUTHENTICATION_URLS.LOGIN, model);
    }

    static logout(model) {
        return instance.post(AUTHENTICATION_URLS.LOGOUT, model);
    }

    static refreshTokens(model) {
        return instance.post(AUTHENTICATION_URLS.REFRESH_TOKEN, model);
    }

    static confirmEmail(model) {
        return instance.post(AUTHENTICATION_URLS.CONFIRM_EMAIL, model);
    }
}
