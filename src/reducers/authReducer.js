import { userRoles } from '../constants/userRoles';
import * as types from '../reduxActions/auth/types';
import tokenService from "../services/tokens";
import jwt from 'jwt-decode';
import { errorMessage } from '../services/alerts';
import { authenticationErrorMessages } from '../constants/messages/authentication';

const intialState = {
    role: userRoles.GUEST,
    isAuthUser: false
}

const authReducer = (state = intialState, action) => {
    switch (action.type) {

        case types.SET_ACCESS: {

            const { accessToken, refreshToken } = action.payload;

            let decodedAccessToken = jwt(accessToken);

            if (decodedAccessToken.role === userRoles.USER) {

                // this is only one role that is available at the time of writing,
                // except for the guest, when other roles appear, we will need to add them

                tokenService.setLocalAccessToken(accessToken);
                tokenService.setLocalRefreshToken(refreshToken);

                return {
                    ...state,
                    role: userRoles.USER,
                    isAuthUser: true
                }
            }

            errorMessage(
                authenticationErrorMessages.LOGIN_FAILED,                    // because we set a role only after login
                authenticationErrorMessages.LOGIN_FAILED_USER_ALREADY_EXIST
            );

            break;
        }

        case types.LOGOUT: {

            tokenService.deleteTokens();

            return {
                ...state,
                role: userRoles.GUEST,
                isAuthUser: false
            }
        }

        default: {
            return state;
        }
    }
}

export default authReducer;
