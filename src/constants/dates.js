import moment from "moment";

export const CALENDER_DATE_FORMAT = "YYYY-MM-DD HH:mm";

export function setDisabledDate (current) {
    const startDate = moment().subtract(1, 'days');
    const endDate = moment().add(1, 'years');

    return current < startDate || current > endDate;
};
