import offersService from "../api/offers";
import { errorMessage } from "./alerts";
import { generalErrorMessages } from "../constants/messages/general";
import { offersErrorMessages } from "../constants/messages/offersMessages";

export async function getUserOffers() {
    return offersService
        .getAllByUser()
        .then(
            async (response) => {
                return await response.data;
            },
            () => {
                errorMessage(
                    offersErrorMessages.LOAD_USER_OFFERS_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                offersErrorMessages.LOAD_USER_OFFERS_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
