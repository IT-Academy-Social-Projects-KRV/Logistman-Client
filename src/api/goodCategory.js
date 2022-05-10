import { GOOD_CATEGORY_URLS } from "../constants/url";
import instance from "./configurations";

export default class goodCategoryService {
    static getGoodCategories() {
        return instance.get(GOOD_CATEGORY_URLS.GET_GOOD_CATEGORIES);
    }
}
