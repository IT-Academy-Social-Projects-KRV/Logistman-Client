import { errorMessage } from "./alerts";
import { generalErrorMessages } from "../constants/messages/general";
import { goodCategoryMessages } from "../constants/messages/goodCategory";
import goodCategoryService from "../api/goodCategories";

export async function getGoodCategories() {
  var data = await getAllGoodCategories();
  return data;
}

export function getAllGoodCategories() {
  return goodCategoryService
    .getAll()
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
