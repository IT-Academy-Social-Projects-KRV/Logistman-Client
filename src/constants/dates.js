import moment from "moment";
import { errorMessage } from "../services/alerts";
import { tripsMessages } from "./messages/trips";

export const CALENDER_DATE_FORMAT = "YYYY-MM-DD HH:mm";
export const MIN_HOURS_VALUE_IN_TRIP = 12;

export const setDisabledDate = (current) => {
    return current && current < moment().startOf("day");
};

export const checkTimeDifference = (dates) => {
    const start = dates[0], end = dates[1];
    const difference = end.diff(start, "hours"),
        now = moment();

    if (moment(start) < now) {
        errorMessage(
            tripsMessages.START_DATE_IS_IN_THE_PAST,
            ""
        );

        return false;
    }

    if (difference < MIN_HOURS_VALUE_IN_TRIP) {
        errorMessage(
            tripsMessages.INCORRECT_TIME_INTERVAL,
            ""
        );

        return false;
    }

    return true;
}
