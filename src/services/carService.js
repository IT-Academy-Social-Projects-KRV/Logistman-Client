import {errorMessage, successMessage} from "./alert.service";
import {generalErrorMessages} from "../constants/messages/general";
import carService from "../api/car";
import {addCarMessages} from "../constants/messages/addCarMessages";

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
                successMessage(addCarMessages.CAR_ADDED_SUCCESSFUL);
            },
            () => {
                errorMessage(
                    addCarMessages.CAR_ADDING_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                addCarMessages.CAR_ADDING_FAILED,
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
                    addCarMessages.CAR_ADDING_FAILED, // change
                    generalErrorMessages.SOMETHING_WENT_WRONG // change
                );
            }
        )
        .catch(() => {
            errorMessage(
                addCarMessages.CAR_ADDING_FAILED, // change
                generalErrorMessages.SOMETHING_WENT_WRONG // change
            );
        });
}
