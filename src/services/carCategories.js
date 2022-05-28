import carCategoriesService from "../api/carCategories";
import { errorMessage } from "./alerts";
import { generalErrorMessages } from "../constants/messages/general";
import { carsErrorMessages } from "../constants/messages/cars";
import { statusCode } from "../constants/statusCodes";

export async function getCarCategories() {
    return carCategoriesService
        .getAll()
        .then(
            async (response) => {
                return await response.data;
            },
            (err) => {
                
                err.response.status === statusCode.NOT_FOUND
                    ? errorMessage(
                        carsErrorMessages.CAR_CATEGORIES_NOT_FOUND
                    )
                    :
                    errorMessage(
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            errorMessage(
                carsErrorMessages.CAR_CATEGORIES_NOT_FOUND,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
