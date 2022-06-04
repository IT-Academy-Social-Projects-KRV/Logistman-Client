import tripsService from './../api/trips';
import { errorMessage } from './alerts';
import { generalErrorMessages } from './../constants/messages/general';

export async function createTrip(model) {

    return await tripsService
        .create(model)
        .then(
            (response) => {
                return response.data;
            },
            () => {
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
