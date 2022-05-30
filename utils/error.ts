const ErrorCodeMapping = {
  "10000": "SERVER_ERROR",
  "10001": "API_ROUTE_NOT_FOUND",
  "10003": "VALIDATION_ERROR",
  "10004": "RESOURCES_NOT_FOUND",
};

export const generateErrorMessage = (
  code: keyof typeof ErrorCodeMapping,
  detail: string | Error,
) => {
  const message = ErrorCodeMapping[code];
  return JSON.stringify({
    code,
    message,
    detail,
  });
};
