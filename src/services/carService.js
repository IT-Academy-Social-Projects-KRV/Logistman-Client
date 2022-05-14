import {errorMessage, successMessage} from "./alert.service";
import {generalErrorMessages} from "../constants/messages/general";
import carService from "../api/car";
import { carErrorMessages } from './../constants/messages/car';

export function addCar(values) {
    let model = {
        model: values.model,
        registrationNumber: values.registrationNumber,
        technicalPassport: values.technicalPassport,
        loadCapacity: values.loadCapacity,
        color: values.color,
        vin: values.vin,
        categoryId: values.category
    };

    carService
        .addCar(model)
        .then(
            () => {
                successMessage(carErrorMessages.CAR_ADDED_SUCCESSFUL);
            },
            () => {
                errorMessage(
                    carErrorMessages.CAR_ADDING_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                carErrorMessages.CAR_ADDING_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function getUserCars() {

    return await carService
        .getUserCars()
        .then(
            (response) => {
                return response.data;
            },
            () => {
                errorMessage(
                    carErrorMessages.LOAD_USER_CARS_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                carErrorMessages.LOAD_USER_CARS_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
