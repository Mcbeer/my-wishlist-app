import { Dispatch } from "redux";
import { dispatchBegin, dispatchComplete } from ".";

export const CLAIM_WISH_BEGIN = "CLAIM_WISH_BEGIN";
export const CLAIM_WISH_SUCCESS = "CLAIM_WISH_SUCCESS";
export const CLAIM_WISH_FAILURE = "CLAIM_WISH_FAILURE";

interface ClaimWishFunctionArgs {
  wishId: string;
  userId: string;
  userName: string;
}

export const claimWishFunction = ({
  wishId,
  userId,
  userName,
}: ClaimWishFunctionArgs) => {
  return (dispatch: Dispatch) => {
    dispatch(dispatchBegin(CLAIM_WISH_BEGIN));

    setTimeout(() => {
      dispatch(
        dispatchComplete(CLAIM_WISH_SUCCESS, { wishId, userId, userName })
      );
    }, 2000);
  };
};
