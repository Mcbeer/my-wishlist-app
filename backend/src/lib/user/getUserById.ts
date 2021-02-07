import { Request, Response } from "express";
import { getUserFromDbById } from "../../db/user/getUserFromDbById";
import { perhaps } from "../../utils/perhaps";
import { respondError, respondSuccess } from "../../utils/respond";

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userIdFromArgs = req.params.userId;

  // No user id found in reqeust
  if (!userIdFromArgs) {
    respondError({
      res,
      error: new Error("ERROR.USER_ID_NOT_FOUND"),
      statusCode: 404,
    });
  }

  const [userError, user] = await perhaps(getUserFromDbById(userIdFromArgs));

  // Something went wrong with the query itself
  if (userError) {
    respondError({
      res,
      error: new Error("ERROR.QUERY_ERROR_USER"),
      statusCode: 500,
    });
    return;
  }

  // No user found
  if (!user) {
    respondError({
      res,
      error: new Error("ERROR.USER_NOT_FOUND"),
      statusCode: 404,
    });
    return;
  }

  respondSuccess({ res, data: user });
  return;
};
