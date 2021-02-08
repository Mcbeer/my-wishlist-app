import { Dispatch } from "redux";
import { dispatchBegin, dispatchComplete } from ".";

export const SIGN_IN_USER_BEGIN = "SIGN_IN_USER_BEGIN";
export const SIGN_IN_USER_SUCCESS = "SIGN_IN_USER_SUCCESS";
export const SIGN_IN_USER_FAILURE = "SIGN_IN_USER_FAILURE";

interface GoogleLoginArgs {
  googleId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
}

export const signInUserFunction = ({
  googleId,
  firstName,
  lastName,
  email,
  avatarUrl,
}: GoogleLoginArgs) => {
  return (dispatch: Dispatch) => {
    dispatch(dispatchBegin(SIGN_IN_USER_BEGIN));

    // Do more...
  };
};
