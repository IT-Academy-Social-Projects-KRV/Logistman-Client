import { userErrorMessages } from "../constants/messages/user";
import {errorMessage, successMessage} from "./alert.service";
import { generalErrorMessages } from "./../constants/messages/general";
import userService from "./../api/user";
import { checkIsUserRoleValid } from "./authentication";
import {carErrorMessages} from "../constants/messages/car";

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
    let model = {
        name: values.name,
        surname: values.surname,
        email: values.email
    };

    userService
        .editUserInfo(model)
        .then(
            () => {
                successMessage(carErrorMessages.CAR_ADDED_SUCCESSFUL);
            },
            (err) => {
                err.response.status === 406
                    ? errorMessage(
                        userErrorMessages.EDIT_USER_PROFILE_FAILED,
                        userErrorMessages.EDIT_USER_PROFILE_FAILED_USER_ALREADY_EXIST
                    )
                    : errorMessage(
                        userErrorMessages.EDIT_USER_PROFILE_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            errorMessage(
                userErrorMessages.EDIT_USER_PROFILE_FAILED,
                userErrorMessages.EDIT_USER_PROFILE_FAILED_USER_ALREADY_EXIST,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
