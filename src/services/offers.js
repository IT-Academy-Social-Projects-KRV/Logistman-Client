import offersService from "../api/offers";
import { errorMessage, successMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import { offersMessages } from "../constants/messages/offers";
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

export async function deleteById(id) {
  await offersService
    .deleteById(id)
    .then(
      () => {
        successMessage(
          generalMessages.DELETE_SUCCESSFULLY,
          1500
        );
      },
      () => {
        errorMessage(
          offersMessages.DELETE_OFFER_FAILED,
          generalMessages.SOMETHING_WENT_WRONG
        );
      })
    .catch(() => {
      errorMessage(
        offersMessages.DELETE_OFFER_FAILED,
        generalMessages.SOMETHING_WENT_WRONG
      );
    });
}
