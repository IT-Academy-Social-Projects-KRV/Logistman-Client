export const SERVER_URL = "https://localhost:44319/api";
export const AUTHENTICATION_URL = "/Authentication";
export const CAR_CATEGORIES_URL = "/CarCategories";
export const CAR_URL = "/Cars";
export const GOOD_CATEGORIES_URL = "/GoodCategories";
export const OFFERS_URL = "/Offers";
export const TRIP_URL = "/Trips";
export const USER_URL = "/Users";
export const INVITES_URL = "/Invites";
export const NOTIFICATIONS_URL = "/Notifications";

export const AUTHENTICATION_URLS = {
    REGISTRATION: AUTHENTICATION_URL + "/register",
    LOGIN: AUTHENTICATION_URL + "/login",
    LOGOUT: AUTHENTICATION_URL + "/logout",
    REFRESH_TOKEN: AUTHENTICATION_URL + "/refresh-token",
    CONFIRM_EMAIL: AUTHENTICATION_URL + "/confirm-email"
};

export const CAR_CATEGORIES_URLS = {
    GET_ALL: CAR_CATEGORIES_URL
};

export const CARS_URLS = {
    ADD: CAR_URL + "/add",
    GET_BY_USER: CAR_URL,
    GET_USER_VERIFIED: CAR_URL + "/user-verified",
    GET_BY_USER_EMAIL: CAR_URL + "/user-cars",
    VERIFY: CAR_URL + "/verify",
    UNVERIFY: CAR_URL + "/unverify",
    DELETE: CAR_URL + "/delete"
};

export const GOOD_CATEGORIES_URLS = {
    GET_ALL: GOOD_CATEGORIES_URL
};

export const OFFERS_URLS = {
    CREATE: OFFERS_URL + "/create",
    GET_ONE_BY_USER: OFFERS_URL + "/user-offer",
    GET_BY_USER: OFFERS_URL,
    CONFIRM_GOODS_TRANSFER: OFFERS_URL + "/confirm-goods-transfer"
};

export const TRIPS_URL = {
    CREATE: TRIP_URL + "/create",
    GET_ALL_ROUTES: TRIP_URL + "/routes",
    GET_ROUTES_BY_USER: TRIP_URL + "/my-routes",
    GET_TRIP_INFO: TRIP_URL + "/info-by-user"
};

export const INVITES_URLS = {
    GET_DRIVERS_INVITES: INVITES_URL + "/drivers",
    MANAGE: INVITES_URL + "/manage"
};

export const USERS_URLS = {
    PROFILE_INFO: USER_URL + "/user-info",
    EDIT: USER_URL + "/edit-info",
    FULL_NAME: USER_URL + "/user-full-name",
    GET_ALL_USERS: USER_URL 
};

export const LOGIST_URLS = {
    EDIT_USER_INFO: USER_URL + "/user-edit-info"
}

export const NOTIFICATIONS_URLS = {
    GET_NOTIFICATIONS_BY_USER: NOTIFICATIONS_URL + "/by-user"
}
