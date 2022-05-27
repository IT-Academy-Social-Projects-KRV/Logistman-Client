export default class InputRules {
    static latinLetters(message) {
        return {
            pattern: new RegExp("^[A-Z][a-z]+$"),
            message: message
        }
    }

    static lengthRange(
        min,
        max,
        message
    ) {
        return {
            min: min,
            max: max,
            message: message
        }
    }

    static required(message) {
        return {
            required: true,
            message: message
        }
    }

    static specificType(
        type,
        message) {
        return {
            type: type,
            message: message
        }
    }

    static password(message) {
        return {
            pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%^&*(){}:;<>,.?+_=|'~\\-])[A-Za-z0-9!@$%^&*(){}:;<>,.?+_=|'~\\-]{7,51}$"),
            message: message
        }
    }

    static capitalLetterFirst(message) {
        return {
            pattern: new RegExp("^[A-Z]"),
            message: message
        }
    }
}
