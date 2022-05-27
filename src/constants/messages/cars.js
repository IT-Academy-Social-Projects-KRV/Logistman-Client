export const carsErrorMessages = Object.freeze({
    NOT_VALID_MODEL: "A model can only contain latin letters, digits and spaces!",
    CAPITAL_LETTER_FIRST: "The field should start with a capital letter!",
    NOT_VALID_REGISTRATION_NUMBER: "The registration number can only contain latin letters, " +
        "digits and spaces!",
    NOT_VALID_TECH_PASSPORT: "The technical passport can only contain latin letters, digits and spaces.",
    NOT_VALID_LOAD_CAPACITY: "The load capacity must be greater than 0!",
    NOT_VALID_VIN: "The VIN can only contain latin letters, digits and spaces!",
    NOT_VALID_VIN_LENGTH: "The VIN must be 17 characters long!",
    NOT_VALID_COLOR: "The color can only contain latin letters!",

    EMPTY_FIELD: "The field cannot be empty!",

    SUCCESSFUL_CAR_ADD: "The car was added successfully!",
    ADD_CAR_FAILED: "Failed to add car!",
    CAR_EXISTS_ERROR: "The car with one or more such unique properties already exists!",
    CAR_CATEGORIES_NOT_FOUND: "Failed to load car categories!",

    LOAD_USER_CARS_FAILED: "Load user's cars failed!"
});
