import { errorMessage, successMessage } from "./alert.service";
import { generalErrorMessages } from "../constants/messages/general";
import { offerErrorMessages } from "../constants/messages/offer";
import {userRoles} from "../constants/userRoles"
import offerService from "../api/offer";
import { offerValues } from "../constants/offerValues";

export function createOffer(values, coordinates) {
  var model = {
    description: values.description,
    goodsWeight: values.goodsWeight,
    startDate: values.startDate[0]._d,
    expirationDate: values.startDate[1]._d,
    goodCategory: values.goodCategory,
    role: userRoles.SENDER,
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
        successMessage(offerErrorMessages.CREATE_OFFER_SUCCESS);
      },
      (err) => {
          errorMessage(
            offerErrorMessages.CREATE_OFFER_FAILED,
            generalErrorMessages.SOMETHING_WENT_WRONG
          );
      }
    )
    .catch(() => {
      errorMessage(
        offerErrorMessages.CREATE_OFFER_FAILED,
        generalErrorMessages.SOMETHING_WENT_WRONG
      );
    });
}
