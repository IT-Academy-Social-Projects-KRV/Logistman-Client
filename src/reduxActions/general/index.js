import * as types from "./types";

export const openModal = () => {
    return {
        type: types.OPENMODAL
    };
}

export const closeModal = () => {
    return {
        type: types.CLOSEMODAL
    };
}
