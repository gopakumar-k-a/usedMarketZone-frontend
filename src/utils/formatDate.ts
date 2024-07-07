import { format, isToday, isYesterday, differenceInMinutes } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Not Available"; // Return "Not Available" for invalid dates
  }

  const now = new Date();
  const minutesDifference = differenceInMinutes(now, date);
  if (minutesDifference < 1) {
    return "Just now";
  } else if (isToday(date)) {
    return ` ${format(date, "hh:mm a")}`;
  } else if (isYesterday(date)) {
    return `Yesterday, ${format(date, "hh:mm a")}`;
  } else {
    return format(date, "MMMM dd, yyyy, hh:mm a");
  }
};
