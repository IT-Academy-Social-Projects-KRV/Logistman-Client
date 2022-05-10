import { errorMessage, successMessage } from "./alert.service";
import { generalErrorMessages } from "../constants/messages/general";
import { offerErrorMessages } from "../constants/messages/offer";
import { userRoles } from "../constants/userRoles";
import offerService from "../api/offer";

export function createOffer(values, coordinates, history) {

    var utcStartDate = new Date(values.startDate._d).toISOString();
    var utcExpirationDate = new Date();
    utcExpirationDate.setDate(utcExpirationDate.getDate() + 1);

    var model = {
        description: values.description,
        goodsWeight: values.goodsWeight,
        startDate: utcStartDate,
        expirationDate: utcExpirationDate,
        goodCategoryId: 1,
        role: userRoles.SENDER,
        point: {
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            address: values.address,
            settlement: values.settlement,
            region: values.region,
            order: 1
        }
    };

    offerService
        .createOffer(model)
        .then(
            () => {
                successMessage(offerErrorMessages.CREATE_OFFER_SUCCESS);
                history.push("/main");
            },
            (err) => {
                if (err.response.status === 400) {
                    errorMessage(
                        offerErrorMessages.CREATE_OFFER_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
                }
            }
        )
        .catch(() => {
            errorMessage(
                offerErrorMessages.CREATE_OFFER_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
