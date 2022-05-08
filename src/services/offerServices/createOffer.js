import offerService from "../../api/offer";
import { AlertService } from "../alert.service";
import { offerErrors } from "../../constants/messages/offerMessages";

export function createOffer(values, history){
    var model = {
        description: values.description,
        goodsWeight: values.goodsWeight,
        startDate: values.startDate,
        expirationDate: values.expirationDate,
        offerPointId: values.offerPointId,
        creatorRoleId: values.creatorRoleId
    };
    offerService
        .createOffer(model)
        .then(
            () => {
                AlertService.errorMessage(
                    offerErrors.CREATE_OFFER_SUCCESS
                );
                history.push("/main");
            },
            (err) => {
                if (err.response.status === 400){
                    AlertService.errorMessage(
                        offerErrors.CREATE_OFFER_FAILED,
                        offerErrors.SOMETHING_WENT_WRONG
                    );
                }
            }
        )
        .catch(() => {
            AlertService.errorMessage(
                offerErrors.CREATE_OFFER_FAILED,
                offerErrors.SOMETHING_WENT_WRONG
            );
        });
}
