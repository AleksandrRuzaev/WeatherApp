import moment from "moment";

const getFormattedDate = (date: Date, format: string) =>
    moment(date).format(format);

export { getFormattedDate };
