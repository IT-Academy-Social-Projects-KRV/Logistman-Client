import tripsService from "../api/trips";
import { tripsErrorMessages } from "../constants/messages/trips";
import { statusCode } from "../constants/statusCodes";
import { errorMessage } from "./alerts";
import { generalErrorMessages } from "../constants/messages/general";

export async function getAllRoutes(paginationFilterModel) {
    return tripsService
      .getAllRoutes(paginationFilterModel)
      .then(
        async (response) => {
          if (response.status === statusCode.NO_CONTENT) {
            return null;
          }
  
          return await response.data;
        },
        () => {
          errorMessage(
            tripsErrorMessages.LOAD_ROUTES_FAILED,
            generalErrorMessages.SOMETHING_WENT_WRONG
          );
        }
      )
      .catch(() => {
        errorMessage(
            tripsErrorMessages.LOAD_ROUTES_FAILED,
            generalErrorMessages.SOMETHING_WENT_WRONG
        );
      });
  }
