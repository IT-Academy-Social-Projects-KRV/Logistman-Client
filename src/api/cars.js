import instance from "./configurations/configurations";
import { CARS_URLS } from "../constants/api/urls";

export default class carsService {
    static add(model) {
        return instance.post(CARS_URLS.ADD, model);
    }

    static getAllByUser() {
        return instance.get(CARS_URLS.GET_BY_USER);
    }

    static getUserVerified() {
        return instance.get(CARS_URLS.GET_USER_VERIFIED);
    }
}
