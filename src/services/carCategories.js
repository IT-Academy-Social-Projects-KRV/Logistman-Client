import carCategoriesService from "../api/carCategories";
import { errorMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import { carsMessages } from "../constants/messages/cars";
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
                        carsMessages.CAR_CATEGORIES_NOT_FOUND
                    )
                    :
                    errorMessage(
                        generalMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            errorMessage(
                carsMessages.CAR_CATEGORIES_NOT_FOUND,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}
