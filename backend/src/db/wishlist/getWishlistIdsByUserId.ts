import { extractWishlistId } from "../../utils/extractWishlistId";
import { createDocumentClient } from "../createDocumentClient";
import { compact } from "lodash";

const client = createDocumentClient();

export const getWishlistIdsByUserId = async (
  userId: string
): Promise<string[]> => {
  const params = {
    TableName: process.env.USERS_TABLE || "",
    KeyConditionExpression:
      "userId = :userId and begins_with(wishlistId, :wishlistId)",
    ExpressionAttributeValues: {
      ":userId": userId,
      ":wishlistId": "LIST#",
    },
  };

  return client
    .query(params)
    .promise()
    .then((result) => result && result.Items)
    .then((items) => {
      if (!items) {
        return [];
      } else {
        return compact(items.map((item) => extractWishlistId(item.wishlistId)));
      }
    });
};
