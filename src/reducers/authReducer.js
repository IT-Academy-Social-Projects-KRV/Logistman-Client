import { userRoles } from "../constants/userRoles";
import * as types from "../reduxActions/auth/types";
import tokenService from "../services/token.service";


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
