import authenticationService from "../api/authentication";
import { AlertService } from "./alert.service";

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
                          "Login failed",
                          "There is already a user with this e-mail!"
                      )
                    : AlertService.errorMessage(
                          "Login failed",
                          "Something went wrong, try again!"
                      );
            }
        )
        .catch(() => {
            AlertService.errorMessage(
                "Login failed",
                "Something went wrong, try again!"
            );
        });
}
