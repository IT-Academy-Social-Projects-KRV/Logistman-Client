import instance from "./configurations";
import {OFFERS_URL} from "../constants/url";

export default class offersService {
    static getUserOffers() {
        return instance(OFFERS_URL);
    }
}
