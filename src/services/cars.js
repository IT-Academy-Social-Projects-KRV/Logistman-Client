import { errorMessage, successMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import carsService from "../api/cars";
import { carsMessages } from '../constants/messages/cars';
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
                successMessage(carsMessages.SUCCESSFUL_CAR_ADD);
            },
            (err) => {
                err.response.status === statusCode.NOT_ACCEPTABLE
                    ? errorMessage(
                        carsMessages.ADD_CAR_FAILED,
                        carsMessages.CAR_EXISTS_ERROR
                    )
                    : errorMessage(
                        carsMessages.ADD_CAR_FAILED,
                        generalMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            errorMessage(
                carsMessages.ADD_CAR_FAILED,
                carsMessages.CAR_EXISTS_ERROR,
                generalMessages.SOMETHING_WENT_WRONG
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
                    carsMessages.LOAD_USER_CARS_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                carsMessages.LOAD_USER_CARS_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
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
                    carsMessages.LOAD_USER_CARS_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                carsMessages.LOAD_USER_CARS_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
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
                    carsMessages.CAR_VERIFICATION_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                carsMessages.CAR_VERIFICATION_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
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
                     carsMessages.CAR_UNVERIFICATION_FAILED,
                     generalMessages.SOMETHING_WENT_WRONG
                 );
             }
         )
        .catch(() => {
            errorMessage(
                carsMessages.CAR_UNVERIFICATION_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
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
                    carsMessages.LOAD_USER_CARS_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                carsMessages.LOAD_USER_CARS_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function deleteById(id) {
    await carsService
    .deleteById(id)
    .then(
        () => {
            successMessage(
                generalMessages.DELETE_SUCCESSFULLY,
                1500
            );
        },
        (err) => {
            if (err.response.status === statusCode.FORBIDDEN) {
                errorMessage(
                    carsMessages.DELETE_CAR_FAILED,
                    carsMessages.FAILED_TO_DELETE_CAR_DUE_ROUTE
                )    
            }
            else {
                errorMessage(
                    carsMessages.DELETE_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            } 
        }
    )
    .catch(() => {
        errorMessage(
            carsMessages.FAILED_TO_DELETE_DUE_ROUTE,
            carsMessages.DELETE_FAILED,
            generalMessages.SOMETHING_WENT_WRONG
        );
    });
}
