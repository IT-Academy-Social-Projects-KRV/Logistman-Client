import { USER_URLS } from "../constants/url";
import instance from "./configurations";

export default class userService {
  static getUser() {
    return instance.get(USER_URLS.USER_INFO);
  }
}
