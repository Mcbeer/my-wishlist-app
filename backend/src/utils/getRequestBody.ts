import { Request } from "express";

export const getRequestBody = <T>(req: Request): T => {
  const requestBody = req.body;

  if (typeof requestBody === "string") {
    return JSON.parse(requestBody);
  } else {
    return requestBody;
  }
};
