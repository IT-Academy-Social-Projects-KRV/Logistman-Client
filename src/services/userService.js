import { userErrorMessages } from "../constants/messages/user";
import {errorMessage, successMessage} from "./alert.service";
import { generalErrorMessages } from "./../constants/messages/general";
import userService from "./../api/user";
import { checkIsUserRoleValid } from "./authentication";

export async function getUserName() {

    // since the menu will be on all pages, the render menu calls this function,
    // and here we call the role check to prevent manual role change
    checkIsUserRoleValid();

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
export function editUserInfo(values) {
    userService
        .editUserInfo(values)
        .then(
            () => {
                successMessage(userErrorMessages.EDIT_USER_PROFILE_SUCCESS);
            },
            () => {
                errorMessage(
                        userErrorMessages.EDIT_USER_PROFILE_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            errorMessage(
                userErrorMessages.EDIT_USER_PROFILE_FAILED,
                userErrorMessages.EDIT_USER_PROFILE_FAILED_EMAIL_ALREADY_EXIST,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
