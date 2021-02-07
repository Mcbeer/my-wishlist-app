import { createDocumentClient } from "../createDocumentClient";

const client = createDocumentClient();

export const unbindWishlistFromUser = async (
  wishlistId: string,
  userId: string
) => {
  const params = {
    TableName: process.env.USERS_TABLE || "",
    Key: {
      userId,
      wishlistId: `LIST#${wishlistId}`,
    },
  };

  await client.delete(params).promise();

  return true;
};
