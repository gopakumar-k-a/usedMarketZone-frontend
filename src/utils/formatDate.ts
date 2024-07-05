import { format, isToday, isYesterday } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Not Available"; // Return "Not Available" for invalid dates
  }


  if (isToday(date)) {
    return `Today, ${format(date, "hh:mm a")}`;
  } else if (isYesterday(date)) {
    return `Yesterday, ${format(date, "hh:mm a")}`;
  } else {
    return format(date, "MMMM dd, yyyy, hh:mm a");
  }
};
