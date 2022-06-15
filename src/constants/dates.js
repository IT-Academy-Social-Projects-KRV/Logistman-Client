import moment from "moment";
import { errorMessage } from "../services/alerts";
import { tripsMessages } from "./messages/trips";

export const CALENDER_DATE_FORMAT = "YYYY-MM-DD HH:mm";
export const MIN_HOURS_VALUE_IN_TRIP = 12;

export const setDisabledDate = (current) => {
    return current && current < moment().startOf("day");
};

export const setDisabledTimeRangeDate = (_, type) => {
    if (type === "start") {
        return {
            disabledHours: () => range(0, 60).splice(0, getCurrentHour() + 1)
        }
    }
};

export const checkTimeDifference = (dates) => {
    const start = dates[0];
    const end = dates[1];

    if (parseInt(moment(start).format("HH")) < getCurrentHour() + 1) {
        errorMessage(
            tripsMessages.START_DATE_IS_IN_THE_PAST,
            tripsMessages.CREATE_TRIP_BLOCKED
        );

        return false;
    }

    const difference = end.diff(start, "hours");

    if (difference < MIN_HOURS_VALUE_IN_TRIP) {
        errorMessage(
            tripsMessages.INCORRECT_TIME_INTERVAL,
            tripsMessages.CREATE_TRIP_BLOCKED
        );

        return false;
    }

    return true;
}


const range = (start, end) => {
    const result = [];

    for (let i = start; i < end; i++) {
        result.push(i);
    }

    return result;
};

const getCurrentHour = () => {
    let currentDate = new Date();
    return currentDate.getHours();
}
