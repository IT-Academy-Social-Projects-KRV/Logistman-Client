import carCategoryService from "../api/carCategory";
import {errorMessage} from "./alert.service";
import {generalErrorMessages} from "../constants/messages/general";

export async function getCarCategories(){
    return carCategoryService
        .getAllCategories()
        .then(
            async (response) => {
                return await response.data["carCategories"];
            },
            () => {
                errorMessage(
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
