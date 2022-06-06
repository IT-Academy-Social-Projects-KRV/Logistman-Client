import { userErrorMessages } from "../constants/messages/user";
import { errorMessage, successMessage } from "./alerts";
import { generalErrorMessages } from "../constants/messages/general";
import usersService from "../api/users";
import { checkIsUserRoleValid } from "./authentication";
import { statusCode } from "../constants/statusCodes";

export function getUserProfileInfo() {
    return usersService
        .getUserInfo()
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

export async function editUserInfo(model) {

    // since the menu will be on all pages, the render menu calls this function,
    // and here we call the role check to prevent manual role change
    checkIsUserRoleValid();

    return await usersService
        .editUserInfo(model)
        .then(
            () => {
                successMessage(userErrorMessages.EDIT_USER_PROFILE_SUCCESS);

                return true;
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
                userErrorMessages.EDIT_USER_PROFILE_INFO_FAILED_EMAIL_ALREADY_EXIST,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function getFullUserName() {
    return await usersService
        .getFullUserName()
        .then(
            (response) => {
                return response.data;
            },
            () => {
                errorMessage(
                    userErrorMessages.GET_USER_FULL_NAME_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                userErrorMessages.GET_USER_FULL_NAME_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function getAllUsers(paginationFilterModel) {
    return await usersService
        .getAllUsers(paginationFilterModel)
        .then(
            (response) => {
                if(response.status === statusCode.NO_CONTENT)
                {
                    return null;
                }

                return response.data;
            },
            () => {
                errorMessage(
                    userErrorMessages.GET_LIST_OF_USERS_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                userErrorMessages.GET_LIST_OF_USERS_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
