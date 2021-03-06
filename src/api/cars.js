import instance from "./configurations/configurations";
import { CARS_URLS } from "../constants/api/urls";

export default class carsService {
    static add(model) {
        return instance.post(CARS_URLS.ADD, model);
    }

    static getAllByUser(paginationFilterModel) {
        return instance.get(CARS_URLS.GET_BY_USER +
            `?PageNumber=${paginationFilterModel.pageNumber}
             &PageSize=${paginationFilterModel.pageSize}`);
    }

    static getAllByUserEmail(paginationFilterModel, email) {
        return instance.get(CARS_URLS.GET_BY_USER_EMAIL +
            `?PageNumber=${paginationFilterModel.pageNumber}
             &PageSize=${paginationFilterModel.pageSize}&email=${email}`);
    }

    static verify(model) {
        return instance.post(CARS_URLS.VERIFY, model);
    }

    static unverify(model) {
        return instance.post(CARS_URLS.UNVERIFY, model);
    }

    static getUserVerified() {
        return instance.get(CARS_URLS.GET_USER_VERIFIED);
    }

    static deleteById(model) {
        return instance.delete(CARS_URLS.DELETE + `?carId=${model}`);
    }
}
