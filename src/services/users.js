import { userMessages } from "../constants/messages/users";
import { errorMessage, successMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import usersService from "../api/users";
import { checkIsUserRoleValid } from "./authentication";
import { statusCode } from "../constants/statusCodes";
import { logout } from "../reduxActions/auth";
import { store } from "../store";

export function getUserProfileInfo() {
    return usersService
        .getUserInfo()
        .then(
            (response) => {
                return response.data;
            },
            () => {
                errorMessage(
                    userMessages.GET_USER_INFO_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                userMessages.GET_USER_INFO_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
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
                successMessage(userMessages.EDIT_USER_PROFILE_SUCCESS);

                return true;
            },
            () => {
                errorMessage(
                    userMessages.EDIT_USER_PROFILE_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                userMessages.EDIT_USER_PROFILE_FAILED,
                userMessages.EDIT_USER_PROFILE_INFO_FAILED_EMAIL_ALREADY_EXIST,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function logistEditUserInfo(model, userEmail) {
    checkIsUserRoleValid();

    return await usersService
        .logistEditUserInfo(model, userEmail)
        .then(
            () => {
                successMessage(userMessages.EDIT_USER_PROFILE_SUCCESS);

                return true;
            },
            () => {
                errorMessage(
                    userMessages.EDIT_USER_PROFILE_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                userMessages.EDIT_USER_PROFILE_FAILED,
                userMessages.EDIT_USER_PROFILE_INFO_FAILED_EMAIL_ALREADY_EXIST,
                generalMessages.SOMETHING_WENT_WRONG
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
                    userMessages.GET_USER_FULL_NAME_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                userMessages.GET_USER_FULL_NAME_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
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
                    userMessages.GET_LIST_OF_USERS_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                userMessages.GET_LIST_OF_USERS_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function deleteUser() {
    await usersService
    .deleteUser()
    .then(
        (response) => {
            console.log(response.status);
            successMessage(
                generalErrorMessages.DELETE_SUCCESSFULLY,
                1000
            );
            store.dispatch(logout());
        },
        (err) => {
            if(err.response.status === statusCode.FORBIDDEN) {
                errorMessage(
                    userErrorMessages.DELETE_USER_FAILED,
                    userErrorMessages.DELETE_USER_FORBIDDEN
                );
            }
            else {
                errorMessage(
                    userErrorMessages.DELETE_USER_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        })
    .catch(() => {
        errorMessage(
            userErrorMessages.DELETE_USER_FAILED,
            generalErrorMessages.SOMETHING_WENT_WRONG
        );
    });
}
