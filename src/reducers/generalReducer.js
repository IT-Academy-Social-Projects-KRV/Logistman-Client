import * as types from "../reduxActions/general/types";
import {LOGOUT} from "../reduxActions/auth/types";

const intialState = {
    isModalOpen: false
}

const generalReducer = (state = intialState, action) => {
    switch (action.type) {
        case types.OPENMODAL: {
            return {
                ...state,
                isModalOpen: true
            };
        }

        case types.CLOSEMODAL: {
            return {
                ...state,
                isModalOpen: false
            };
        }

        case LOGOUT: {
            return {
                isModalOpen: false
            };
        }

        default: {
            return state;
        }
    }
}

export default generalReducer;
