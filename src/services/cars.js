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
                if(response.status === statusCode.NO_CONTENT)
                {
                    return null;
                }

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

export async function getUserCarsByEmail(paginationFilterModel, email) {
    return await carsService
        .getAllByUserEmail(paginationFilterModel, email)
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

export async function verifyCar(vin) {
    await carsService
        .verify({vin})
        .then(
            () => {},
            () => {
                errorMessage(
                    carsErrorMessages.CAR_VERIFICATION_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                carsErrorMessages.CAR_VERIFICATION_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function unverifyCar(vin) {
     await carsService
        .unverify({vin})
         .then(
             () => {},
             () => {
                 errorMessage(
                     carsErrorMessages.CAR_UNVERIFICATION_FAILED,
                     generalErrorMessages.SOMETHING_WENT_WRONG
                 );
             }
         )
        .catch(() => {
            errorMessage(
                carsErrorMessages.CAR_UNVERIFICATION_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function getUserVerifiedCarsAsync() {
    return await carsService
        .getUserVerified()
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

export async function deleteById(id) {
    await carsService
    .deleteById(id)
    .then(
        () => {
            successMessage(
                generalErrorMessages.DELETE_SUCCESSFULLY,
                1500
            );
        },
        (err) => {
            if (err.response.status === statusCode.FORBIDDEN) {
                errorMessage(
                    carsErrorMessages.DELETE_CAR_FAILED,
                    carsErrorMessages.FAILED_TO_DELETE_CAR_DUE_ROUTE
                )    
            }
            else {
                errorMessage(
                    carsErrorMessages.DELETE_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            } 
        }
    )
    .catch(() => {
        errorMessage(
            carsErrorMessages.FAILED_TO_DELETE_DUE_ROUTE,
            carsErrorMessages.DELETE_FAILED,
            generalErrorMessages.SOMETHING_WENT_WRONG
        );
    });
}
