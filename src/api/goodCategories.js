import instance from "./configurations/configurations";
import { GOOD_CATEGORIES_URLS } from "../constants/api/urls";

export default class carCategoriesService {
    static getAll() {
        return instance.get(GOOD_CATEGORIES_URLS.GET_ALL);
    }
}
