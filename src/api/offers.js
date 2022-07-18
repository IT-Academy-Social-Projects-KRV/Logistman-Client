import instance from "./configurations/configurations";
import { OFFERS_URLS } from "../constants/api/urls";

export default class offersService {
    static create(model) {
        return instance.post(OFFERS_URLS.CREATE, model);
    }

    static getOneByUser(model) {
        return instance.get(OFFERS_URLS.GET_ONE_BY_USER, model);
    }

    static getAllByUser(paginationFilterModel) {
        return instance.get(OFFERS_URLS.GET_BY_USER +
            `?PageNumber=${paginationFilterModel.pageNumber}
             &PageSize=${paginationFilterModel.pageSize}`);
    }

    static deleteById(model) {
        return instance.delete(OFFERS_URLS.DELETE + `?offerId=${model}`);
    }
    
    static getOffersNearRout(model) {
        return instance.get(OFFERS_URLS.GET_BY_NEAR_ROUT +
            `?tripId=${model}`);
    }
}
