import authenticationService from "../api/authentication";
import { AlertService } from "./alert.service";
import { authErrors } from "../constants/messages/authMessages";
import store from "../index";
import { setUserRole, logout } from "../reduxActions/auth";
import { generalErrorMessages } from "../constants/messages/general";
import tokenService from "../services/token.service";

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
                AlertService.successMessage(
                    authErrors.REGISTRATION_SUCCESS
                )

                history.push("/login");
            },
            (err) => {
                err.response.status === 400
                    ? AlertService.errorMessage(
                        authErrors.REGISTRATION_FAILED,
                        authErrors.REGISTRATION_FAILED_USER_ALREADY_EXIST
                    )
                    : AlertService.errorMessage(
                        authErrors.REGISTRATION_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            AlertService.errorMessage(
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
                tokenService.setLocalAccessToken(response.data.token);
                tokenService.setLocalRefreshToken(response.data.refreshToken);
                
                store.dispatch(setUserRole());

                history.push("/main");
            },
            (err) => {
                err.response.status === 400
                    ? AlertService.errorMessage(
                        authErrors.LOGIN_FAILED,
                        authErrors.LOGIN_FAILED_USER_ALREADY_EXIST
                    )
                    : AlertService.errorMessage(
                        authErrors.LOGIN_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            AlertService.errorMessage(
                authErrors.LOGIN_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function logoutUser() {
    var model = {
        refreshToken: tokenService.getLocalRefrehsToken()
    };

    authenticationService
        .logoutUser(model)
        .then(
            () => {
                store.dispatch(logout());
            },
            () => {
                AlertService.errorMessage(
                    authErrors.LOGOUT_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            AlertService.errorMessage(
                authErrors.LOGOUT_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
