import offersService from "../api/offers";
import { errorMessage, successMessage } from "./alerts";
import { generalErrorMessages } from "../constants/messages/general";
import { offersErrorMessages } from "../constants/messages/offersMessages";
import { statusCode } from "../constants/statusCodes";
import { offerValues } from "../constants/offerValues";

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

export function createOffer(values, coordinates, history) {
    console.log(values)

  const model = {
    description: values.description,
    goodsWeight: values.goodsWeight,
    startDate: values.dates[0]._d,
    expirationDate: values.dates[1]._d,
    goodCategory: values.goodCategory,
    role: values.role,
    point: {
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      address: values.address,
      settlement: values.settlement,
      region: values.region,
      order: offerValues.ORDER_BY_DEFAULT
    },
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
