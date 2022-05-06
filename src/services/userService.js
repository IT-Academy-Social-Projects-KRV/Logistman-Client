import { userErrorMessages } from "../constants/messages/user";
import { errorMessage } from "./alert.service";
import { generalErrorMessages } from "./../constants/messages/general";
import userService from "./../api/user";

export async function getUserName() {
    var userInfo = await getUserProfileInfo();
    return userInfo.name + " " + userInfo.surname;
}

export function getUserProfileInfo() {
    return userService
        .getUser()
        .then(
            (response) => {
                return response.data;
            },
            () => {
                errorMessage(
                    userErrorMessages.GET_USER_INFO_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                userErrorMessages.GET_USER_INFO_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
