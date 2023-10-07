import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateDifference(dateString: Date): string {
  const currentDate: Date = new Date();
  const inputDate: Date = new Date(dateString);

  const differenceInMilliseconds: number =
    currentDate.getTime() - inputDate.getTime();

  const differenceInDays: number = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );
  const differenceInMonths: number = Math.floor(differenceInDays / 30);
  const differenceInYears: number = Math.floor(differenceInMonths / 12);

  if (differenceInYears > 0) {
    return `${differenceInYears} year${differenceInYears > 1 ? "s" : ""} ago`;
  } else if (differenceInMonths > 0) {
    return `${differenceInMonths} month${
      differenceInMonths > 1 ? "s" : ""
    } ago`;
  } else if (differenceInDays > 0) {
    return `${differenceInDays} day${differenceInDays > 1 ? "s" : ""} ago`;
  } else return `Today`;
}
