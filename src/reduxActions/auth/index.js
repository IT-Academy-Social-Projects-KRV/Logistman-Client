import * as types from "./types";

export const logout = () => {
    return {
        type: types.LOGOUT
    };
}

export const setAccess = (token) => {
    return {
        type: types.SET_ACCESS,
        payload: token
    };
}

export const changeRole = (role) => {
    return {
        type: types.CHANGE_ROLE,
        payload: role
    };
};
