import { errorMessage, successMessage } from "./alert.service";
import { generalErrorMessages } from "../constants/messages/general";
import { offerErrorMessages } from "../constants/messages/offer";
import { userRoles } from "../constants/userRoles";
import offerService from "../api/offer";

export function createOffer(values) {
    var model = {
        description: values.description,
        goodsWeight: values.goodsWeight,
        startDate: "2022-05-10T15:52:03.629Z",
        expirationDate: "2022-05-10T15:52:03.629Z",
        goodCategoryId: 1,
        role: "SENDER",
        point: {
            latitude: 48.686,
            longitude: 31.086,
            address: values.address,
            settlement: values.settlement,
            region: values.region,
            order: 0,
        },
    };
    console.log(model);

    offerService
        .createOffer(model)
        .then(
            () => {
                successMessage(offerErrorMessages.CREATE_OFFER_SUCCESS);
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
