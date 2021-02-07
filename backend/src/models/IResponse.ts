export enum ResponseType {
  ERROR = "error",
  SUCCESS = "success",
}

export interface IErrorResponse extends IGenericResponse {
  type: string;
  message: string;
  code: number;
  stacktrace: string;
}

export interface ISuccessResponse<T> extends IGenericResponse {
  data: T | T[];
}

interface IGenericResponse {
  responseType: ResponseType;
}
