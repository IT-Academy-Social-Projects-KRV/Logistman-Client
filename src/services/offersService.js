import offersService from "../api/offers";
import { errorMessage, successMessage } from "./alert.service";
import { generalErrorMessages } from "../constants/messages/general";
import { offersErrorMessages } from "../constants/messages/offersMessages";
import { offerRoles } from "../constants/offerRoles";
import offerService from "../api/offers";
import { offerValues } from "../constants/offerValues";

export async function getUserOffers() {
  return offersService
    .getUserOffers()
    .then(
      async (response) => {
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

export function createOffer(values, coordinates) {
  var model = {
    description: values.description,
    goodsWeight: values.goodsWeight,
    startDate: values.dates[0]._d,
    expirationDate: values.dates[1]._d,
    goodCategory: values.goodCategory,
    role: offerRoles.SENDER,
    point: {
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      address: values.address,
      settlement: values.settlement,
      region: values.region,
      order: offerValues.ORDER_BY_DEFAULT,
      tripId: null,
    },
  };

  offerService
    .createOffer(model)
    .then(
      () => {
        successMessage(offersErrorMessages.CREATE_OFFER_SUCCESS);
      },
      (err) => {
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
