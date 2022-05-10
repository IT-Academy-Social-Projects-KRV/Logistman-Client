import { POINT_URLS } from "../constants/url";
import instance from "./configurations";

export default class pointService {
    static createPoint(model) {
        return instance.post(POINT_URLS.CREATE_POINT, model);
    }
}
