import { errorMessage } from "./alerts";
import { generalErrorMessages } from "../constants/messages/general";
import invitesService from './../api/invites';
import { statusCode } from './../constants/statusCodes';
import { invitesMessages } from './../constants/messages/invites';

export function getOffersInvites(model) {
    return invitesService
        .getOffersInvites(model)
        .then(
            (response) => {
                if (response.status === statusCode.NO_CONTENT) {
                    return null;
                }

                return response.data;
            },
            () => {
                errorMessage(
                    invitesMessages.GET_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        );
}

export function getDriversInvites(model) {
    return invitesService
        .getDriversInvites(model)
        .then(
            (response) => {
                if (response.status === statusCode.NO_CONTENT) {
                    return null;
                }

                return response.data;
            },
            () => {
                errorMessage(
                    invitesMessages.GET_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        );
}

export function manageInivite(model) {
    return invitesService
        .manage(model)
        .then(
            () => {
                return true;
            },
            () => {
                model.isAccepted ?
                    errorMessage(
                        invitesMessages.ACCEPTION_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    )
                    :
                    errorMessage(
                        invitesMessages.DECLINATION_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );

                return false;
            }
        );
}
