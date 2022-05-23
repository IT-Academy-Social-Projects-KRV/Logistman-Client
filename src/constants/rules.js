export default class Rules {
    static latinLetters(message) {
        return {
            type: "string",
            pattern: new RegExp("^[A-Z][a-z]+$"),
            message: message
        }
    }

    static lengthRange(
        type,
        min,
        max,
        message
    ) {
        return {
            type: type,
            min: min,
            max: max,
            message: message
        }
    }

    static required(
        required,
        message
    ) {
        return {
            required: required,
            message: message
        }
    }

    static typeMessage(
        type,
        message) {
        return {
            type: type,
            message: message
        }
    }
}
