import { Error } from "../generated/graphql";

export const formErrors = (errors: Error[]) => {
  const errorObject: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    errorObject[field] = message;
  });

  return errorObject;
};
