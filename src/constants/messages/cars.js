export const carsMessages = Object.freeze({
    NOT_VALID_MODEL: "A model can only contain latin letters, digits and spaces!",
    CAPITAL_LETTER_FIRST: "The field should start with a capital letter!",
    NOT_VALID_REGISTRATION_NUMBER: "The registration number can only contain latin letters, " +
        "digits and spaces!",
    NOT_VALID_TECH_PASSPORT: "The technical passport can only contain latin letters, digits and spaces.",
    NOT_VALID_LOAD_CAPACITY: "The load capacity must be greater than 0!",
    NOT_VALID_VIN: "The VIN can only contain latin letters, digits and spaces!",
    NOT_VALID_VIN_LENGTH: "The length of the VIN must be 17 characters long!",
    NOT_VALID_COLOR: "The color name can only contain latin letters!",

    SUCCESSFUL_CAR_ADD: "The car was added successfully!",
    ADD_CAR_FAILED: "Failed to add car!",
    CAR_EXISTS_ERROR: "The car with one or more such properties already exists!",
    CAR_CATEGORIES_NOT_FOUND: "Failed to load car categories!",
    CAR_VERIFICATION_FAILED: "Failed to verify car",
    CAR_UNVERIFICATION_FAILED: "Failed to unverify car",
    DELETE_CAR_FAILED: "Failed to delete car",
    FAILED_TO_DELETE_CAR_DUE_ROUTE: "There are routes on this car!",

    LOAD_USER_CARS_FAILED: "Load user's cars failed!",
    ANY_VERIFIED_CAR: "You don't have any verified car!",
    ANY_SELECTED_CAR: "You have not selected any cars!",

    NOT_VALID_LOAD_CAPACITY_FOR_TRIP: "The load capacity in trip must be less or equal to car's load capacity!"
});
