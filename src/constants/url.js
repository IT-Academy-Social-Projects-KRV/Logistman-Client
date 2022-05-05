export const SERVER_URL = "https://localhost:44319/api";
export const USER_URL = "/User";
export const AUTHENTICATION_URL = "/Authentication";

export const AUTHENTICATION_URLS = {
    REGISTRATION: AUTHENTICATION_URL + "/register",
    LOGIN: AUTHENTICATION_URL + "/login",
    LOGOUT: AUTHENTICATION_URL + "/logout",
    REFRESH_TOKEN: AUTHENTICATION_URL + "/refresh-token"
}

export const USER_URLS = {
    USER_INFO: USER_URL + "/user-info"
}
