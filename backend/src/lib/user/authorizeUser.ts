import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { getUserFromDbByGoogleId } from "../../db/user/getUserFromDbByGoogleId";
import { putUserIntoDb } from "../../db/user/putUserIntoDb";
import { generateTokenAccess } from "../../utils/generateTokenAccess";
import { getRequestBody } from "../../utils/getRequestBody";
import { perhaps } from "../../utils/perhaps";
import { respondError, respondSuccess } from "../../utils/respond";

export interface AuthorizeUserBody {
  googleId: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  email: string;
}

export const authorizeUser = async (req: Request, res: Response) => {
  // Grab the data from req.body
  const requestBody = getRequestBody<AuthorizeUserBody>(req);

  // Check if user exists in db
  const [userFetchError, user] = await perhaps(
    getUserFromDbByGoogleId(requestBody.googleId)
  );

  if (userFetchError) {
    respondError({ res, statusCode: 500, error: userFetchError });
    return;
  }

  // If no -> Register the user and do the "login" flow
  if (!user) {
    // Register the user
    const userId = nanoid(12);
    const [updatedUserError, updatedUser] = await perhaps(
      putUserIntoDb(requestBody, userId)
    );

    if (updatedUserError) {
      respondError({ res, statusCode: 500, error: updatedUserError });
      return;
    }

    if (!updatedUser) {
      respondError({
        res,
        error: new Error(
          "Could not update your user credentials at this time, please try again"
        ),
        statusCode: 500,
      });
      return;
    }

    // We now have a user to grant access to
    const accessToken = generateTokenAccess(updatedUser.userId);

    respondSuccess({ res, data: { token: accessToken } });
  } else {
    // If yes -> create a token for user, and return that token (for now, in prod set it in cookies server-side)
    const [updatedUserError, updatedUser] = await perhaps(
      putUserIntoDb(requestBody, user.userId)
    );

    if (updatedUserError) {
      respondError({
        res,
        error: new Error(
          "Could not update your user credentials at this time, please try again"
        ),
        statusCode: 500,
      });
      return;
    }

    if (!updatedUser) {
      respondError({
        res,
        error: new Error(
          "Could not update your user credentials at this time, please try again"
        ),
        statusCode: 500,
      });
      return;
    }

    // We now have a user to grant access to
    const accessToken = generateTokenAccess(updatedUser.userId);

    respondSuccess({ res, data: { token: accessToken } });
  }

  return;
};
