export const inputValidationErrorMessages = Object.freeze({
    NAME_MUST_BE_BETWEEN_1_AND_50: "The name must be between 1 and 50 letters!",
    SURNAME_MUST_BE_BETWEEN_1_AND_50: "The surname must be between 1 and 50 letters!",

    EMPTY_NAME: "Please enter your name!",
    EMPTY_SURNAME: "Please enter your surname!",
    EMPTY_EMAIL: "Please enter your e-mail!",
    EMPTY_PASSWORD: "Please enter your password!",

    NOT_VALID_NAME: "The name must start with a capital letter and " +
        "continue with lowercase letters!\nAnd only latin letters!",
    NOT_VALID_SURNAME: "The surname must start with a capital letter " +
        "and continue with lowercase letters!\nAnd only latin letters!",
    NOT_VALID_EMAIL: "Invalid e-mail entered!",
    NOT_VALID_PASSWORD: "Password must contain one or more uppercase " +
        "and lowercase letters, one or more digits and special characters!\n" +
        "The password must be between 8 and 50 symbols!",

    CONFIRM_PASSWORD: "Please confirm your password!",
    PASSWORD_DONT_MATCH: "The two passwords that you entered do not match!"
});
