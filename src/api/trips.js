import instance from "./configurations/configurations";
import { TRIPS_URL } from "../constants/api/urls";

export default class tripsService {
    static create(model) {
        return instance.post(TRIPS_URL.CREATE, model);
    }
}
