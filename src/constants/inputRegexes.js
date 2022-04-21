export const inputRegexes = Object.freeze({
    NAME: "^[A-Z][a-z]{1,51}$",
    SURNAME: "^[A-Z][a-z]{1,51}$",
    PASSWORD:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{7,51}$",
});
