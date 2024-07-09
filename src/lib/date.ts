const monthFull = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dayFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function formatReviewDate(date: Date) {
  return `${
    monthFull[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}

export const formatAboutSellerDate = formatReviewDate;

export const formatUserRegistrationDate = (date: Date) => {
  return `${date.getDate()} ${
    monthFull[date.getMonth()]
  } ${date.getFullYear()}`;
};

export function formatOrderDate(date: Date) {
  return `${date.getDate().toString().padStart(2, "0")}.${date
    .getMonth()
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;
}
