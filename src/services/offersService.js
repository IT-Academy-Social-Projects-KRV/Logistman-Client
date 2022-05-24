import offersService from "../api/offers";
import {errorMessage} from "./alert.service";
import {generalErrorMessages} from "../constants/messages/general";

export async function getUserOffers() {
    return offersService
        .getUserOffers()
        .then(
            async (response) => {
                return await response.data;
            },
            (err) => {
                errorMessage(
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
