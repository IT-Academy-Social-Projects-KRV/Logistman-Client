import { errorMessage, successMessage } from "./alert.service";
import { generalErrorMessages } from "../constants/messages/general";
import { pointErrorMessages } from "../constants/messages/point";
import pointService from "../api/point";

export function createPoint(values, history) {
    var model = {
        latitude: values.latitude,
        longitude: values.longitude,
        address: values.address,
        settlement: values.settlement,
        region: values.region,
        order: values.order,
    };

    pointService
        .createPoint(model)
        .then(
            () => {
                successMessage(pointErrorMessages.CREATE_POINT_SUCCESS);
                history.push("/main");
            },
            (err) => {
                if (err.response.status === 400) {
                    errorMessage(
                        pointErrorMessages.CREATE_POINT_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
                }
            }
        )
        .catch(() => {
            errorMessage(
                pointErrorMessages.CREATE_POINT_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
