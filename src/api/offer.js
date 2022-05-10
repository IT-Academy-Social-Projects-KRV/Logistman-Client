import { OFFER_URLS } from "../constants/url";
import instance from "./configurations";

export default class offerService {
    static createOffer(model) {
        return instance.post(OFFER_URLS.CREATE_OFFER, model);
    }
}
