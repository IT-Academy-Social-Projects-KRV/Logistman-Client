import instance from "./configurations/configurations";
import { USERS_URLS } from "../constants/api/urls";

export default class usersService {
  static getUserInfo() {
    return instance.get(USERS_URLS.PROFILE_INFO);
  }

  static editUserInfo(model) {
    return instance.post(USERS_URLS.EDIT, model);
  }

  static getFullUserName() {
    return instance.get(USERS_URLS.FULL_NAME);
  }
}
