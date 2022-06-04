import { errorMessage, successMessage } from "./alerts";
import { generalErrorMessages } from "../constants/messages/general";
import carsService from "../api/cars";
import { carsErrorMessages } from '../constants/messages/cars';
import { statusCode } from "../constants/statusCodes";

export function addCar(values) {
    let model = {
        model: values.model,
        registrationNumber: values.registrationNumber,
        technicalPassport: values.technicalPassport,
        loadCapacity: values.loadCapacity,
        color: values.color,
        vin: values.vin,
        categoryName: values.category
    };

    carsService
        .add(model)
        .then(
            () => {
                successMessage(carsErrorMessages.CAR_ADDED_SUCCESSFUL);
            },
            (err) => {
                err.response.status === statusCode.NOT_ACCEPTABLE
                    ? errorMessage(
                        carsErrorMessages.CAR_ADDING_FAILED,
                        carsErrorMessages.CAR_EXISTS_ERROR
                    )
                    : errorMessage(
                        carsErrorMessages.CAR_ADDING_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            errorMessage(
                carsErrorMessages.CAR_ADDING_FAILED,
                carsErrorMessages.CAR_EXISTS_ERROR,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function getUserCars(paginationFilterModel) {

    return await carsService
        .getAllByUser(paginationFilterModel)
        .then(
            (response) => {
                return response.data;
            },
            () => {
                errorMessage(
                    carsErrorMessages.LOAD_USER_CARS_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                carsErrorMessages.LOAD_USER_CARS_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
