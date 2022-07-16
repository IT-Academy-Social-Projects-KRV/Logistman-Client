import { userRoles } from '../constants/userRoles';
import * as types from '../reduxActions/auth/types';
import tokenService from "../services/tokens";
import jwt from 'jwt-decode';
import { errorMessage } from '../services/alerts';
import { authenticationMessages } from '../constants/messages/authentication';

const intialState = {
    role: userRoles.GUEST,
    isAuthUser: false
}

const authReducer = (state = intialState, action) => {
    switch (action.type) {

        case types.SET_ACCESS: {

            const { accessToken, refreshToken } = action.payload;

            let decodedAccessToken = jwt(accessToken);
            let role = decodedAccessToken.role;

            if (userRoles[role.toUpperCase()] !== undefined) {

                tokenService.setLocalAccessToken(accessToken);
                tokenService.setLocalRefreshToken(refreshToken);

                return {
                    ...state,
                    role: role,
                    isAuthUser: true
                }
            }

            errorMessage(
                authenticationMessages.LOGIN_FAILED,                    // because we set a role only after login
                authenticationMessages.LOGIN_FAILED_USER_ALREADY_EXIST
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
