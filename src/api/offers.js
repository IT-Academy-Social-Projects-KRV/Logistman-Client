import instance from "./configurations";
import { OFFER_URLS } from "../constants/url";

export default class offersService {
    static getUserOffers() {
        return instance.get(OFFER_URLS);
    }
    static createOffer(model) {
        return instance.post(OFFER_URLS.CREATE_OFFER, model);
    }
}
