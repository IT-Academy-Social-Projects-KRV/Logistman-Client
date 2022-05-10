import { errorMessage, successMessage } from "./alert.service";
import { generalErrorMessages } from "../constants/messages/general";
import { offerErrorMessages } from "../constants/messages/offer";
import { userRoles } from "../constants/userRoles";
import offerService from "../api/offer";

export function createOffer(values, history) {
    var model = {
        description: values.description,
        goodsWeight: values.goodsWeight,
        startDate: values.startDate,
        expirationDate: new Date().getDay(),
        goodCategoryId: 1,
        role: userRoles.SENDER,
        point: {
            latitude: values.latitude,
            longitude: values.longitude,
            address: values.address,
            settlement: values.settlement,
            region: values.region,
            order: 1,
        },
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
