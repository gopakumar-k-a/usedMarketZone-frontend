import { format, isToday, isTomorrow, isYesterday } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Not Available"; // Return "Not Available" for invalid dates
  }

  // const now = new Date();
  // const minutesDifference = differenceInMinutes(now, date);
  // if (minutesDifference < 1) {
  //   return "Just now";
  // }
  if (isToday(date)) {
    return ` ${format(date, "hh:mm a")}`;
  }
  if (isYesterday(date)) {
    return `Yesterday, ${format(date, "hh:mm a")}`;
  }
  if(isTomorrow(date)){
    return `Tommorow, ${format(date, "hh:mm a")}`;

  }
  return format(date, "MMMM dd, yyyy, hh:mm a");
};

