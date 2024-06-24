import { ValidationError } from "@/lib/types/base";

export const extractValidationError = (errors: any, fieldname: string) => {
  const tempErrors = errors as ValidationError[];
  return tempErrors.find((err) => err.property === fieldname);
};
