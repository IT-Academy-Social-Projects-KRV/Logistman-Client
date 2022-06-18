import tripsService from "../api/trips";
import { tripsErrorMessages } from "../constants/messages/trips";
import { statusCode } from "../constants/statusCodes";
import { errorMessage } from "./alerts";
import { generalErrorMessages } from "../constants/messages/general";
import { tripValues } from "../constants/tripValues";

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

export const concatSettlements = (points) => {
    let settlements = [];

    points.forEach(point => {
      if(point.settlement !== undefined) {
        settlements.push(point.settlement);
      }
    });

    return settlements.join(", ");
}

export const concatThroughCities = (points) => {
    let settlements = [];
    let result = [];

    points.forEach(point => {
      if(point.settlement !== undefined) {
        settlements.push(point.settlement);
      }
    });
    
    if(settlements.length < tripValues.MAX_SETTLEMENTS_COUNT) {
      return settlements.join(", ");
    }
    else {
      result.push(settlements[0]);
      result.push(settlements[1]);
      result.push(settlements[settlements.length - 2]);
      result.push(settlements[settlements.length - 1]);

      return result.join(", ");
    }
}
