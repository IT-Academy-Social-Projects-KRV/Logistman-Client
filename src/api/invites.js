import instance from "./configurations/configurations";
import { INVITES_URLS } from "../constants/api/urls";

export default class invitesService {
  static getOffersInvites(paginationFilterModel) {
    return instance.get(INVITES_URLS.GET_OFFERS_INVITES +
      `?PageNumber=${paginationFilterModel.pageNumber}
       &PageSize=${paginationFilterModel.pageSize}`);
  }

  static manage(model) {
    return instance.post(INVITES_URLS.MANAGE, model);
  }
}
