import carCategoryService from "../api/carCategory";
import {errorMessage} from "./alert.service";
import {generalErrorMessages} from "../constants/messages/general";
import {carErrorMessages} from "../constants/messages/car";
import store from "../index";
import {closeModal} from "../reduxActions/general";

export async function getCarCategories() {
    return carCategoryService
        .getAllCategories()
        .then(
            async (response) => {
                return await response.data["carCategories"];
            },
            (err) => {
                store.dispatch(closeModal());
                err.response.status === 404
                    ? errorMessage(
                        carErrorMessages.CAR_CATEGORIES_NOT_FOUND
                    )
                    :
                    errorMessage(
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            store.dispatch(closeModal());
            errorMessage(
                carErrorMessages.CAR_CATEGORIES_NOT_FOUND,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
