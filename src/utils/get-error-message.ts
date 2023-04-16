import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError,
  errorsMap: Record<string, string | undefined>,
  defaultMessage: string
): string | undefined => {
  if (
    "data" in error &&
    typeof error.data === "object" &&
    error.data &&
    "error" in error.data
  ) {
    return errorsMap[error.data.error as keyof typeof errorsMap];
  }

  if ("status" in error) {
    return errorsMap[error.status as keyof typeof errorsMap];
  }

  return defaultMessage;
};

export default getErrorMessage;
