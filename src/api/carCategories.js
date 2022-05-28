import instance from "./configurations/configurations";
import { CAR_CATEGORIES_URLS } from "../constants/api/urls";

export default class carCategoriesService {
    static getAll() {
        return instance.get(CAR_CATEGORIES_URLS.GET_ALL);
    }
}
