import instance from "./configurations/configurations";
import { TRIPS_URL } from "../constants/api/urls";

export default class tripsService {
    static create(model) {
        return instance.post(TRIPS_URL.CREATE, model);
    }

    static getAllRoutes(paginationFilterModel){
        return instance.get(TRIPS_URL.GET_ALL_ROUTES + 
            `?PageNumber=${paginationFilterModel.pageNumber}
             &PageSize=${paginationFilterModel.pageSize}`);
    }

    static getAllRoutesByUser(paginationFilterModel){
        return instance.get(TRIPS_URL.GET_ROUTES_BY_USER +
            `?PageNumber=${paginationFilterModel.pageNumber}
             &PageSize=${paginationFilterModel.pageSize}`);
    }

    static deleteRoute(id) {
        return instance.delete(TRIPS_URL.DELETE + `?TripId=${id}`);
    }
}
