import tripsService from '../api/trips';
import { errorMessage, successMessage } from './alerts';
import { generalErrorMessages } from '../constants/messages/general';
import { tripsMessages } from '../constants/messages/trips';

export function createTrip(model, history) {
    return tripsService
        .create(model)
        .then(
            () => {
                history.push("/main");
                successMessage(
                    tripsMessages.SUCCESSFUL_TRIP_CREATION,
                    2500
                );
            },
            (err) => {
                errorMessage(
                    err.response.data,
                    ''
                );
            }
        )
        .catch(() => {
            errorMessage(
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
