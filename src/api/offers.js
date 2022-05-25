import instance from "./configurations";
import {OFFERS_URL} from "../constants/url";

export default class offersService {
    static getUserOffers() {
        return instance.get(OFFERS_URL);
    }
}
