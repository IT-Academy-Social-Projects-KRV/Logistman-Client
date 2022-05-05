import { userErrorMessages } from '../constants/messages/user';
import { AlertService } from './alert.service';
import { generalErrorMessages } from './../constants/messages/general';
import userService from './../api/user';

export async function getUserName() {
    var userInfo = await getUserProfileInfo();
    return userInfo.name + ' ' + userInfo.surname;
}

export function getUserProfileInfo() {
    return userService
        .getUser()
        .then(
            (response) => {

                return response.data;
            },
            () => {
                AlertService.errorMessage(
                    userErrorMessages.GET_USER_INFO_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            AlertService.errorMessage(
                userErrorMessages.GET_USER_INFO_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
