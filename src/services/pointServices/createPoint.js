import pointService from "../../api/point";
import { AlertService } from "../alert.service";
import { pointErrors } from "../../constants/messages/pointMessages";

export function createPoint(values, history){
    console.log(values)
    var model = {
        latitude: values.latitude,
        longitude: values.longitude,
        address: values.address,
        settlement: values.settlement,
        region: values.region,
        order: values.order
    };
    pointService
        .createPoint(model)
        .then(
            () => {
                AlertService.successMessage(
                    pointErrors.CREATE_POINT_SUCCESS
                );
                history.push("/main");
            },
            (err) => {
                if (err.response.status === 400){
                    AlertService.errorMessage(
                        pointErrors.CREATE_POINT_FAILED,
                        pointErrors.SOMETHING_WENT_WRONG
                    );
                }
            }
        )
        .catch(() => {
            AlertService.errorMessage(
                pointErrors.CREATE_POINT_FAILED,
                pointErrors.SOMETHING_WENT_WRONG
            );
        });
}
