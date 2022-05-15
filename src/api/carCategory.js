import instance from "./configurations";
import {CAR_CATEGORY_URLS} from "../constants/url";

export default class carCategoryService{
    static getAllCategories()
    {
        return instance.get(CAR_CATEGORY_URLS.GET_CAR_CATEGORIES);
    }
}