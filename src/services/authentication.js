import authenticationService from "../api/authentication";
import { AlertService } from './alert.service';

export function register(values, history) {

    var model = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password
    }

    authenticationService.registerUser(model)
        .then(() => {
            history.push("/login");
        },
            err => {
                err.response.status == 400 ?
                    AlertService.errorMessage("Registration failed", "There is already a user with this e-mail!") :
                    AlertService.errorMessage("Registration failed", "Something went wrong, try again!");
            })
        .catch(() => {
            AlertService.errorMessage("Registration failed", "Something went wrong, try again!");
        })
}
