import instance from "./configurations/configurations";
import { NOTIFICATIONS_URLS } from "../constants/api/urls";

export default class notificationsService {
    static getNotificationsByUser(paginationFilterModel) {
        return instance.get(NOTIFICATIONS_URLS.GET_NOTIFICATIONS_BY_USER +
            `?PageNumber=${paginationFilterModel.pageNumber}
             &PageSize=${paginationFilterModel.pageSize}`);
    }
}
