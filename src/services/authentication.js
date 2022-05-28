import authenticationService from "../api/authentication";
import { successMessage, errorMessage } from "./alerts";
import { authenticationErrorMessages } from "../constants/messages/authentication";
import { setAccess, logout } from "../reduxActions/auth";
import { generalErrorMessages } from "../constants/messages/general";
import tokenService from "../services/tokens";
import jwt from 'jwt-decode';
import { statusCode } from "../constants/statusCodes";
import { store } from "../store";

export function register(values, history) {
    let model = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password
    };

    authenticationService
        .register(model)
        .then(
            () => {
                successMessage(authenticationErrorMessages.REGISTRATION_SUCCESS);

                history.push("/login");
            },
            (err) => {
                err.response.status === statusCode.BAD_REQUEST
                    ? errorMessage(
                        authenticationErrorMessages.REGISTRATION_FAILED,
                        authenticationErrorMessages.REGISTRATION_FAILED_USER_ALREADY_EXIST
                    )
                    : errorMessage(
                        authenticationErrorMessages.REGISTRATION_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            errorMessage(
                authenticationErrorMessages.REGISTRATION_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function login(values, history) {
    let model = {
        email: values.email,
        password: values.password
    };

    authenticationService
        .login(model)
        .then(
            (response) => {
                store.dispatch(setAccess(response.data));

                history.push("/main");
            },
            (err) => {
                err.response.status === statusCode.BAD_REQUEST
                    ? errorMessage(
                        authenticationErrorMessages.LOGIN_FAILED,
                        authenticationErrorMessages.LOGIN_FAILED_USER_ALREADY_EXIST
                    )
                    : errorMessage(
                        authenticationErrorMessages.LOGIN_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            errorMessage(
                authenticationErrorMessages.LOGIN_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function logoutUser() {
    let model = {
        refreshToken: tokenService.getLocalRefreshToken()
    };

    authenticationService
        .logout(model)
        .then(
            () => {
                store.dispatch(logout());
            },
            () => {
                errorMessage(
                    authenticationErrorMessages.LOGOUT_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                authenticationErrorMessages.LOGOUT_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function checkIsUserRoleValid() {

    let accessToken = tokenService.getLocalAccessToken();

    if (accessToken !== null) {
        let decodedAccessToken = jwt(accessToken);

        if (decodedAccessToken.role !== store.getState().authReducer.role) {
            store.dispatch(logout());
        }
    }
    else {
        store.dispatch(logout());
    }
}
