export const inputRegexes = Object.freeze({
    NAME: "^[A-Z][a-z]{1,51}$",
    SURNAME: "^[A-Z][a-z]{1,51}$",
    PASSWORD:
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})",
});
