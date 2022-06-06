import offersService from "../api/offers";
import { errorMessage } from "./alerts";
import { generalErrorMessages } from "../constants/messages/general";
import { offersErrorMessages } from "../constants/messages/offersMessages";
import { statusCode } from "../constants/statusCodes";

export async function getUserOffers(paginationFilterModel) {
    return offersService
        .getAllByUser(paginationFilterModel)
        .then(
            async (response) => {
                if(response.status === statusCode.NO_CONTENT)
                {
                    return null;
                }

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
