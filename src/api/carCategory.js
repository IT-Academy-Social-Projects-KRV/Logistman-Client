import instance from "./configurations";
import {CAR_CATEGORIES_URL} from "../constants/url";

export default class carCategoryService {
    static getAllCategories() {
        return instance.get(CAR_CATEGORIES_URL);
    }
}
