import { AuthorizeUserBody } from "../../lib/user/authorizeUser";
import { IUser } from "../../models/IUser";
import { createDocumentClient } from "../createDocumentClient";

const client = createDocumentClient();

export const putUserIntoDb = (
  user: AuthorizeUserBody,
  userId: string
): Promise<IUser> => {
  const params = {
    TableName: process.env.USERS_TABLE || "",
    Key: {
      userId: userId,
      wishlistId: "USER_INFO",
    },
    UpdateExpression:
      "set firstName = :firstName, lastName = :lastName, avatarUrl = :avatarUrl, email = :email, googleId = if_not_exists(googleId, :googleId)",
    ExpressionAttributeValues: {
      ":firstName": user.firstName,
      ":lastName": user.lastName,
      ":avatarUrl": user.avatarUrl,
      ":email": user.email,
      ":googleId": user.googleId,
    },
    ReturnValues: "ALL_NEW",
  };

  return client
    .update(params)
    .promise()
    .then((result) => result.Attributes as IUser);
};
