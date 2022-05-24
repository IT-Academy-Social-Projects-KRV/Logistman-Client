export const SERVER_URL = "https://localhost:44319/api";
export const USER_URL = "/User";
export const AUTHENTICATION_URL = "/Authentication";
export const OFFER_URL = "/Offer";
export const POINT_URL = "/Point";
export const GOOD_CATEGORY_URL = "/GoodCategory";
export const CAR_URL = "/Car";
export const CAR_CATEGORIES_URL = "/CarCategories";

export const AUTHENTICATION_URLS = {
    REGISTRATION: AUTHENTICATION_URL + "/register",
    LOGIN: AUTHENTICATION_URL + "/login",
    LOGOUT: AUTHENTICATION_URL + "/logout",
    REFRESH_TOKEN: AUTHENTICATION_URL + "/refresh-token",
};

export const OFFER_URLS = {
    CREATE_OFFER: OFFER_URL + "/create",
};

export const POINT_URLS = {
    CREATE_POINT: POINT_URL + "/create",
};

export const GOOD_CATEGORY_URLS = {
    GET_GOOD_CATEGORIES: GOOD_CATEGORY_URL + "/get/all",
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
