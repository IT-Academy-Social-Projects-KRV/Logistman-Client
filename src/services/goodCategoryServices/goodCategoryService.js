import { AlertService } from "../alert.service";
import { userError } from "../../constants/messages/user";
import goodCategoryService from "../../api/goodCategory";

export function getlistCategories() {
    return goodCategoryService
        .getGoodCategories()
        .then(
            (response) => {
                return response.data;
            },
            (err) => {
                AlertService.errorMessage(
                    userError.GET_USER_INFO_FAILED,
                    userError.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch((err) => {
            AlertService.errorMessage(
                userError.GET_USER_INFO_FAILED,
                userError.SOMETHING_WENT_WRONG
            );
        });
}
