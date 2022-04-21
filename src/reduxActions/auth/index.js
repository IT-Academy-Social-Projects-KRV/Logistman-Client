import * as types from "./types";

export const logout = () => {
    return {
        type: types.LOGOUT
    };
}

export const setUserRole = () => {
    return {
        type: types.SET_USER_ROLE
    };
}
