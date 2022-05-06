import authenticationService from "../api/authentication";
import { successMessage, errorMessage } from "./alert.service";
import { authErrors } from "../constants/messages/authMessages";
import store from "../index";
import { setUserRole, logout } from "../reduxActions/auth";
import { generalErrorMessages } from "../constants/messages/general";

export function register(values, history) {
    var model = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
    };

    authenticationService
        .registerUser(model)
        .then(
            () => {
                successMessage(authErrors.REGISTRATION_SUCCESS);

                history.push("/login");
            },
            (err) => {
                err.response.status === 400
                    ? (authErrors.REGISTRATION_FAILED,
                      authErrors.REGISTRATION_FAILED_USER_ALREADY_EXIST)
                    : errorMessage(
                          authErrors.REGISTRATION_FAILED,
                          generalErrorMessages.SOMETHING_WENT_WRONG
                      );
            }
        )
        .catch(() => {
            errorMessage(
                authErrors.REGISTRATION_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function login(values, history) {
    var model = {
        email: values.email,
        password: values.password,
    };

    authenticationService
        .loginUser(model)
        .then(
            (response) => {
                localStorage.setItem("accessToken", response.data.token);
                localStorage.setItem(
                    "refreshToken",
                    response.data.refreshToken
                );

                store.dispatch(setUserRole());

                history.push("/main");
            },
            (err) => {
                err.response.status === 400
                    ? errorMessage(
                          authErrors.LOGIN_FAILED,
                          authErrors.LOGIN_FAILED_USER_ALREADY_EXIST
                      )
                    : errorMessage(
                          authErrors.LOGIN_FAILED,
                          generalErrorMessages.SOMETHING_WENT_WRONG
                      );
            }
        )
        .catch(() => {
            errorMessage(
                authErrors.LOGIN_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function logoutUser() {
    var model = {
        refreshToken: window.localStorage.getItem("refreshToken"),
    };

    authenticationService
        .logoutUser(model)
        .then(
            () => {
                store.dispatch(logout());
            },
            () => {
                errorMessage(
                    authErrors.LOGOUT_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                authErrors.LOGOUT_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
