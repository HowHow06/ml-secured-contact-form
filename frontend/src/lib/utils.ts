import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateNRICDate = (dateStr: string) => {
  const year = parseInt(dateStr.slice(0, 2), 10) + 1900; 
  const month = parseInt(dateStr.slice(2, 4), 10) - 1;
  const day = parseInt(dateStr.slice(4, 6), 10);

  const date = new Date(year, month, day);
  return date.getFullYear() === year &&
         date.getMonth() === month &&
         date.getDate() === day;
};