import { Response } from "express";
import {
  ISuccessResponse,
  ResponseType,
  IErrorResponse,
} from "../models/IResponse";

interface RespondSuccessArgs<T> {
  res: Response;
  data: T | T[];
}

interface RespondErrorArgs {
  res: Response;
  error: Error;
  statusCode?: number;
}

export const respondSuccess = <T>({ res, data }: RespondSuccessArgs<T>) => {
  res.send(formatSuccessResponse(data));
};

export const respondError = ({
  res,
  error,
  statusCode = 500,
}: RespondErrorArgs) => {
  res.status(statusCode).send(formatErrorResponse(error, statusCode));
};

const formatErrorResponse = (
  error: Error,
  code: number,
  responseType = ResponseType.ERROR
): IErrorResponse => {
  return {
    responseType,
    type: typeof error,
    message: error.message,
    code,
    stacktrace:
      process.env.NODE_ENV === "production" ? "🥞" : error.stack || "",
  };
};

const formatSuccessResponse = <T>(
  data: T | T[],
  responseType = ResponseType.SUCCESS
): ISuccessResponse<T> => {
  return {
    responseType,
    data,
  };
};
