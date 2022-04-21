import { userRoles } from '../constants/userRoles';
import * as types from '../reduxActions/auth/types';

const intialState = {
    role: userRoles.GUEST,
    isAuthUser: false
}

const authReducer = (state = intialState, action) => {
    switch (action.type) {

        case types.LOGOUT: {

            // delete tokens

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
