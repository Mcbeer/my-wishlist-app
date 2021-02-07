import { IUser } from "../../models/IUser";
import { createDocumentClient } from "../createDocumentClient";

const client = createDocumentClient();

export const getUserFromDbByGoogleId = async (
  googleId: string
): Promise<IUser | null> => {
  const params = {
    TableName: process.env.USERS_TABLE || "",
    IndexName: process.env.DYNAMODB_GOOGLEID_INDEX,
    KeyConditionExpression: "googleId = :googleId",
    ExpressionAttributeValues: {
      ":googleId": googleId,
      ":userInfo": "USER_INFO",
    },
    FilterExpression: "wishlistId = :userInfo",
  };

  return client
    .query(params)
    .promise()
    .then((response) => response.Items)
    .then((items) => {
      console.log("Items from query:", items);
      if (items && items.length > 0) {
        return items[0] as IUser;
      } else {
        return null;
      }
    });
};
