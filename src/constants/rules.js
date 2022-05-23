export default class Rules {
    static ruleLatinLetters(massege) {
        return {
            type: "string",
            pattern: new RegExp("^[A-Z][a-z]+$"),
            message: massege
        }
    }

    static ruleLengthRange(
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

    static ruleRequired(
        required,
        message
    ) {
        return {
            required: required,
            message: message
        }
    }

    static ruleTypeMassage(
        type,
        massage) {
        return {
            type: type,
            message: massage,
        }
    }
}
