import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createDocumentClient } from "../createDocumentClient";

const client = createDocumentClient();

export const deleteWishlistEntry = async (
  wishlistId: string
): Promise<boolean> => {
  const params: DocumentClient.DeleteItemInput = {
    TableName: process.env.WISHLISTS_TABLE || "",
    Key: {
      wishlistId,
      wishId: "WISHLIST",
    },
  };

  await client.delete(params).promise();

  return true;
};
