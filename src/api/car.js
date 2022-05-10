import instance from "./configurations";
import {CAR_URLS} from "../constants/url";

export default class carService {
    static addCar(model) {
        return instance.post(CAR_URLS.ADD_CAR, model);
    }
}
