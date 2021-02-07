import { Request, Response } from "express";
import { getUserFromDbById } from "../../db/user/getUserFromDbById";
import { getRequesterId } from "../../utils/getRequesterId";
import { perhaps } from "../../utils/perhaps";
import { respondError, respondSuccess } from "../../utils/respond";

export const getUserSelf = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Request object from get self", req);
  const requesterId = getRequesterId(req);
  const [userError, user] = await perhaps(getUserFromDbById(requesterId));

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
