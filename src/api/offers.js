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

    static getOffersNearRout(paginationFilterModel, routeId) {
        return instance.get(OFFERS_URLS.GET_BY_NEAR_ROUT +
            `?PageNumber=${paginationFilterModel.pageNumber}
             &PageSize=${paginationFilterModel.pageSize}+
             &RouteId=${routeId}`);
    }
}
