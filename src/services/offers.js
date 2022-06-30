import offersService from "../api/offers";
import {errorMessage, successMessage} from "./alerts";
import {generalErrorMessages} from "../constants/messages/general";
import {offersErrorMessages} from "../constants/messages/offersMessages";
import {statusCode} from "../constants/statusCodes";

export async function getUserOffers(paginationFilterModel) {
    return offersService
        .getAllByUser(paginationFilterModel)
        .then(
            async (response) => {
                if (response.status === statusCode.NO_CONTENT) {
                    return null;
                }

                return await response.data;
            },
            () => {
                errorMessage(
                    offersErrorMessages.LOAD_USER_OFFERS_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                offersErrorMessages.LOAD_USER_OFFERS_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function createOffer(values, history, point) {
  const model = {
    description: values.description,
    goodsWeight: values.goodsWeight,
    startDate: values.date._d,
    goodCategory: values.goodCategory,
    role: values.role,
    point: point
  }

    offersService.create(model)
        .then(
            () => {
                successMessage(offersErrorMessages.CREATE_OFFER_SUCCESS);
                history.push("/main");
            },
            () => {
                errorMessage(
                    offersErrorMessages.CREATE_OFFER_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                offersErrorMessages.CREATE_OFFER_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function getOffersNearRout(paginationFilterModel, routId) {
    return offersService
        .getOffersNearRout(paginationFilterModel, routId)
        .then(
            async (response) => {
                if (response.status === statusCode.NO_CONTENT) {
                    return null;
                }

                return await response.data;
            },
            () => {
                errorMessage(
                    offersErrorMessages.LOAD_USER_OFFERS_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                offersErrorMessages.LOAD_USER_OFFERS_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}

