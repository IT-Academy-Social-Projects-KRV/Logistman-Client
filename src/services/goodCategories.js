import { errorMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import { goodCategoryMessages } from "../constants/messages/goodCategories";
import goodCategoryService from "../api/goodCategories";

export function getAllGoodCategories() {
  return goodCategoryService
    .getAll()
    .then(
      (response) => {
        return response.data;
      },
      () => {
        errorMessage(
          goodCategoryMessages.GET_GOOD_CATEGORIES_FAILED,
          generalMessages.SOMETHING_WENT_WRONG
        );
      }
    )
    .catch(() => {
      errorMessage(
        goodCategoryMessages.GET_GOOD_CATEGORIES_FAILED,
        generalMessages.SOMETHING_WENT_WRONG
      );
    });
}
