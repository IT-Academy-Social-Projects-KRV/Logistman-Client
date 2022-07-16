import offersService from "../api/offers";
import {errorMessage, successMessage} from "./alerts";
import {generalErrorMessages} from "../constants/messages/general";
import {statusCode} from "../constants/statusCodes";
import { errorMessage, successMessage } from "./alerts";
import { statusCode } from "../constants/statusCodes";

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
          offersMessages.LOAD_USER_OFFERS_FAILED,
          generalMessages.SOMETHING_WENT_WRONG
        );
      }
    )
    .catch(() => {
      errorMessage(
        offersMessages.LOAD_USER_OFFERS_FAILED,
        generalMessages.SOMETHING_WENT_WRONG
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
        successMessage(offersMessages.CREATE_OFFER_SUCCESS);
        history.push("/main");
      },
      () => {
        errorMessage(
          offersMessages.CREATE_OFFER_FAILED,
          generalMessages.SOMETHING_WENT_WRONG
        );
      }
    )
    .catch(() => {
      errorMessage(
        offersMessages.CREATE_OFFER_FAILED,
        generalMessages.SOMETHING_WENT_WRONG
      );
    });
}

export async function getOffersNearRout(routId) {
    return offersService
        .getOffersNearRout(routId)
        .then(
            async (response) => {
                if (response.status === statusCode.NO_CONTENT) {

                    return null;
                }

                return await response.data;
            },
            () => {
                errorMessage(
                    offersMessages.LOAD_USER_OFFERS_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                offersMessages.LOAD_USER_OFFERS_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
