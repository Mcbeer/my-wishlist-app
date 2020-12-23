import { Dispatch } from "redux";

export const AUTHENTICATE_BEGIN = "AUTHENTICATE_BEGIN";
export const AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS";
export const AUTHENTICATE_FAILURE = "AUTHENTICATE_FAILURE";

const authenticateBegin = () => {
  return {
    type: AUTHENTICATE_BEGIN,
  };
};
const authenticateSuccess = (data: any) => {
  return {
    type: AUTHENTICATE_SUCCESS,
    payload: data,
  };
};
const authenticateFailure = (error: Error) => {
  return {
    type: AUTHENTICATE_FAILURE,
    payload: error,
  };
};

export const authenticate = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(authenticateBegin());

    // if (authenticateError) {
    //   dispatch(authenticateFailure(authenticateError));
    // } else {
    //   dispatch(authenticateSuccess(authenticated));
    // }
  };
};
