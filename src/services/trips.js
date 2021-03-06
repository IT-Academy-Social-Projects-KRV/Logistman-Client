import tripsService from "../api/trips";
import {errorMessage, successMessage} from "./alerts";
import {generalMessages} from "../constants/messages/general";
import {tripsMessages} from "../constants/messages/trips";
import {statusCode} from "../constants/statusCodes";
import {tripValues} from "../constants/tripValues";

export async function getAllRoutes(paginationFilterModel) {
    return tripsService
        .getAllRoutes(paginationFilterModel)
        .then(
            async (response) => {
                if (response.status === statusCode.NO_CONTENT) {
                    return null;
                }

                return await response.data;
            },
            () => {
                errorMessage(
                    tripsMessages.LOAD_ROUTES_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                tripsMessages.LOAD_ROUTES_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function getAllRoutesByUser(paginationFilterModel) {
    return tripsService
        .getAllRoutesByUser(paginationFilterModel)
        .then(
            async (response) => {
                if (response.status === statusCode.NO_CONTENT) {
                    return null;
                }

                return await response.data;
            },
            () => {
                errorMessage(
                    tripsMessages.LOAD_ROUTES_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                tripsMessages.LOAD_ROUTES_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export const concatSettlements = (points) => {
    let settlements = [];

    points.forEach((point) => {
        if (point.settlement !== null) {
            settlements.push(point.settlement);
        }
    });

    return settlements.join(", ");
};

export const concatThroughCities = (points) => {
    let settlements = [];
    let result = [];

    points.forEach((point) => {
        if (point.settlement !== null) {
            settlements.push(point.settlement);
        }
    });

    if (settlements.length < tripValues.MAX_SETTLEMENTS_COUNT) {
        return settlements.join(", ");
    } else {
        result.push(settlements[0]);
        result.push(settlements[1]);
        result.push(settlements[settlements.length - 2]);
        result.push(settlements[settlements.length - 1]);

        return result.join(", ");
    }
};

export function createTrip(model, history) {
    return tripsService
        .create(model)
        .then(
            () => {
                history.push("/main");
                successMessage(tripsMessages.SUCCESSFUL_TRIP_CREATION, 2500);
            },
            (err) => {
                errorMessage(err.response.data, "");
            }
        )
        .catch(() => {
            errorMessage(generalMessages.SOMETHING_WENT_WRONG);
        });
}

export async function deleteRouteById(id) {
    await tripsService
        .deleteRouteById(id)
        .then(
            () => {
                successMessage(generalMessages.DELETE_SUCCESSFULLY, 1500);
            },
            (err) => {
                err.response.status === statusCode.BAD_REQUEST
                    ? errorMessage(tripsMessages.DELETE_FAILED_DUE_INVITES)
                    : errorMessage(
                        tripsMessages.DELETE_FAILED,
                        generalMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            errorMessage(
                tripsMessages.DELETE_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function getTripById(tripId) {
    return tripsService
        .getById(tripId)
        .then(
            async (response) => {

                return response.data;
            },
            () => {
                errorMessage(
                    tripsMessages.NOT_FOUND,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                tripsMessages.NOT_FOUND,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function manageTrip(model, history) {
    return tripsService
        .manage(model)
        .then(
            () => {
                successMessage(tripsMessages.SUCCESSFUL_TRIP_CREATION, 2000);
                history.push("/routes");
            },
            () => {
                errorMessage(
                    tripsMessages.MANAGE_TRIP_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                tripsMessages.MANAGE_TRIP_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function getUserTripInfo() {
    return tripsService
        .getUserTripInfo()
        .then(
            async (response) => {
                if (response.status === statusCode.NO_CONTENT) {

                    return null;
                }

                return await response.data;
            },
            () => {
                errorMessage(
                    tripsMessages.LOAD_TRIP_FAILED,
                    generalMessages.LOAD_TRIP_OFFERS_FAILED
                );
            }
        )
        .catch(() => {
            errorMessage(
                tripsMessages.LOAD_TRIP_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}
