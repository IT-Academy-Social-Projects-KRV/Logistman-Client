import instance from "./configurations/configurations";
import { USERS_URLS } from "../constants/api/urls";
import { LOGIST_URLS } from "../constants/api/urls";

export default class usersService {
  static getUserInfo() {
    return instance.get(USERS_URLS.PROFILE_INFO);
  }

  static editUserInfo(model) {
    return instance.post(USERS_URLS.EDIT, model);
  }

  static logistEditUserInfo(model, userEmail) {
    return instance.post(LOGIST_URLS.EDIT_USER_INFO + 
      `?email=${userEmail}`, model);
  }

  static getFullUserName() {
    return instance.get(USERS_URLS.FULL_NAME);
  }

  static getAllUsers(paginationFilterModel) {
      return instance.get(USERS_URLS.GET_ALL_USERS + 
          `?PageNumber=${paginationFilterModel.pageNumber}
           &PageSize=${paginationFilterModel.pageSize}`);
  }
}
