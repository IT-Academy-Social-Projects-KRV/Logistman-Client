import { userRoles } from "../constants/userRoles";
import * as types from "../reduxActions/auth/types";
import tokenService from "../services/token.service";
import jwt from 'jwt-decode';
import { errorMessage } from '../services/alert.service';
import { authErrors } from '../constants/messages/authMessages';


const intialState = {
    role: userRoles.GUEST,
    isAuthUser: false,
};

const authReducer = (state = intialState, action) => {
    switch (action.type) {

        case types.CHANGE_ROLE: {
            return {
                ...state,
                role: action.payload
            };
        }

        case types.SET_USER_ROLE: {
            return {
                ...state,
                role: userRoles.USER,
                isAuthUser: true,
            };
        }
        case types.SET_ACCESS: {

            const { token, refreshToken } = action.payload;

            var decodedAccessToken = jwt(token);

            if (decodedAccessToken.role === userRoles.USER) {

                // this is only one role that is available at the time of writing,
                // except for the guest, when other roles appear, we will need to add them

                tokenService.setLocalAccessToken(token);
                tokenService.setLocalRefreshToken(refreshToken);

                return {
                    ...state,
                    role: userRoles.USER,
                    isAuthUser: true
                }
            }

            errorMessage(
                authErrors.LOGIN_FAILED,                    // because we set a role only after login
                authErrors.LOGIN_FAILED_USER_ALREADY_EXIST
            );

            break;
        }

        case types.LOGOUT: {
            tokenService.deleteTokens();

            return {
                ...state,
                role: userRoles.GUEST,
                isAuthUser: false,
            };
        }

        default: {
            return state;
        }
    }
};

export default authReducer;
