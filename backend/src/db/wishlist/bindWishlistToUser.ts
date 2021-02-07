import { IWishlistBindDetails, WishlistRoles } from "../../models/IWishlist";
import { createDocumentClient } from "../createDocumentClient";

const client = createDocumentClient();

export const bindWishlistToUser = (
  wishlistId: string,
  userId: string,
  listRole: WishlistRoles
): Promise<IWishlistBindDetails> => {
  const params = {
    TableName: process.env.USERS_TABLE || "",
    Key: {
      userId,
      wishlistId: `LIST#${wishlistId}`,
    },
    UpdateExpression: "set listRole = :listRole",
    ExpressionAttributeValues: {
      ":listRole": listRole,
    },
    ReturnValues: "ALL_NEW",
  };

  return client
    .update(params)
    .promise()
    .then((result) => result.Attributes as IWishlistBindDetails);
};
