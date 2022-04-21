import authenticationService from "../api/authentication";
import { AlertService } from "./alert.service";
import { errorMessages } from "../constants/errorMessages";

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
                history.push("/login");
            },
            (err) => {
                err.response.status == 400
                    ? AlertService.errorMessage(
                          "Registration failed",
                          "There is already a user with this e-mail!"
                      )
                    : AlertService.errorMessage(
                          "Registration failed",
                          "Something went wrong, try again!"
                      );
            }
        )
        .catch(() => {
            AlertService.errorMessage(
                "Registration failed",
                "Something went wrong, try again!"
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
            () => {
                history.push("/home");
            },
            (err) => {
                err.response.status == 400
                    ? AlertService.errorMessage(
                          errorMessages.LOGIN_FAILED,
                          errorMessages.LOGIN_FAILED_USER_ALREADY_EXIST
                      )
                    : AlertService.errorMessage(
                          errorMessages.LOGIN_FAILED,
                          errorMessages.LOGIN_FAILED_SOMETHING_WENT_WRONG
                      );
            }
        )
        .catch(() => {
            AlertService.errorMessage(
                errorMessages.LOGIN_FAILED,
                errorMessages.LOGIN_FAILED_SOMETHING_WENT_WRONG
            );
        });
}
