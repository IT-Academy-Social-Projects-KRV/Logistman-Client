import { errorMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import notificationsService from "../api/notifications";
import { notificationsMessages } from "../constants/messages/notifications";
import { statusCode } from "../constants/statusCodes";

export function getNotificationsByUser(model) {
    return notificationsService
        .getNotificationsByUser(model)
        .then(
            (response) => {
                if (response.status === statusCode.NO_CONTENT) {
                    return null;
                }

                return response.data;
            },
            () => {
                errorMessage(
                    notificationsMessages.GET_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        );
}
