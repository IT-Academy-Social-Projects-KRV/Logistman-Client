import { USER_URLS } from "../constants/url";
import instance from "./configurations";

export default class userService {
  static getUser() {
    return instance.get(USER_URLS.USER_INFO);
  }
  static editUserInfo(model){
    return instance.post(USER_URLS.USER_EDIT_INFO,model);
  }
}
