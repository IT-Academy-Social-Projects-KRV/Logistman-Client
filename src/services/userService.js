import userService from "../api/user";
import { AlertService } from "./alert.service";
import { userError } from "../constants/messages/user";

export function getUserName() {
    return userService
        .getUser()
        .then(
            (response) => {
                return response.data.name + " " + response.data.surname;
            },
            (err) => {
                AlertService.errorMessage(
                    userError.GET_USER_INFO_FAILED,
                    userError.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch((err) => {
            AlertService.errorMessage(
                userError.GET_USER_INFO_FAILED,
                userError.SOMETHING_WENT_WRONG
            );
        });
}
