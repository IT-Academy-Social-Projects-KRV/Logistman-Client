export const inputValidationErrors = Object.freeze({
    EMPTY_NAME_MESSAGE: "Please input your name!",
    EMPTY_SURNAME_MESSAGE: "Please input your surname!",
    EMPTY_EMAIL_MESSAGE: "Please input your e-mail!",
    EMPTY_PASSWORD_MESSAGE: "Please input your password!",

    NOT_VALID_NAME_MESSAGE: "The name must start with a capital letter and " +
        "continue with lowercase letters!\nAnd only Latin letters!",
    NOT_VALID_SURNAME_MESSAGE: "The surname must start with a capital letter " +
        "and continue with lowercase letters!!\nAnd only Latin letters!",
    NOT_VALID_EMAIL_MESSAGE: "Invalid e-mail entered!",
    NOT_VALID_PASSWORD_MESSAGE: "Password must contain one or more uppercase " +
        "and lowercase letters, one or more digits and special characters!",

    CONFIRM_PASSWORD: "Please confirm your password!",
    PASSWORD_DONT_MATCH: "The two passwords that you entered do not match!",
});
