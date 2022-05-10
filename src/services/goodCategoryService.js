import { errorMessage } from "./alert.service";
import { generalErrorMessages } from "../../constants/messages/general";
import { goodCategoryMessages } from "../constants/messages/goodCategory";
import goodCategoryService from "../api/goodCategory";

export async function getGoodCategories() {
    var data = await getAllGoodCategories();
    return data;
}

export function getAllGoodCategories() {
    return goodCategoryService
        .getGoodCategories()
        .then(
            (response) => {
                return response.data;
            },
            () => {
                errorMessage(
                    goodCategoryMessages.GET_GOOD_CATEGORIES__FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                goodCategoryMessages.GET_GOOD_CATEGORIES__FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );
        });
}
