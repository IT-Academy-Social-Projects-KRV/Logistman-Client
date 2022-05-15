export const SERVER_URL = "https://localhost:5001/api";
export const USER_URL = "/User";
export const AUTHENTICATION_URL = "/Authentication";
export const CAR_URL = "/Car";
export const CAR_CATEGORY_URL = "/CarCategory";

export const AUTHENTICATION_URLS = {
    REGISTRATION: AUTHENTICATION_URL + "/register",
    LOGIN: AUTHENTICATION_URL + "/login",
    LOGOUT: AUTHENTICATION_URL + "/logout",
    REFRESH_TOKEN: AUTHENTICATION_URL + "/refresh-token"
};

export const USER_URLS = {
    USER_INFO: USER_URL + "/user-info"
};

export const CAR_URLS = {
    ADD_CAR: CAR_URL + "/add",
    GET_USER_CARS: CAR_URL + "/user-cars"
};

export const CAR_CATEGORY_URLS = {
    GET_CAR_CATEGORIES: CAR_CATEGORY_URL + "/categories"
}
