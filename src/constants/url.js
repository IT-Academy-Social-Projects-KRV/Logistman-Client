export const SERVER_URL = "https://localhost:44319/api";
export const USER_URL = "/User";
export const AUTHENTICATION_URL = "/Authentication";
export const CAR_URL = "/Car";
export const CAR_CATEGORIES_URL = "/CarCategories";

export const AUTHENTICATION_URLS = {
    REGISTRATION: AUTHENTICATION_URL + "/register",
    LOGIN: AUTHENTICATION_URL + "/login",
    LOGOUT: AUTHENTICATION_URL + "/logout",
    REFRESH_TOKEN: AUTHENTICATION_URL + "/refresh-token"
};

export const USER_URLS = {
    USER_INFO: USER_URL + "/user-info",
    USER_EDIT_INFO: USER_URL + "/edit-info"
};

export const CAR_URLS = {
    ADD_CAR: CAR_URL + "/add",
    GET_USER_CARS: CAR_URL + "/user-cars"
};
