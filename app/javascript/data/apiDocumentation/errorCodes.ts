import type { ApiErrorCode } from "./types";

export const API_ERROR_CODES: ApiErrorCode[] = [
  {
    code: "200 OK",
    description: "everything worked as expected.",
  },
  {
    code: "400 Bad Request",
    description: "you probably missed a required parameter.",
  },
  {
    code: "401 Unauthorized",
    description: "you did not provide a valid access token.",
  },
  {
    code: "402 Request Failed",
    description: "the parameters were valid but request failed.",
  },
  {
    code: "404 Not Found",
    description: "the requested item doesn't exist.",
  },
  {
    code: "500, 502, 503, 504 Server Error",
    description: "something else went wrong on our end.",
  },
];

export const ERROR_EXAMPLE = {
  success: false,
  message: "The product could not be found.",
};
