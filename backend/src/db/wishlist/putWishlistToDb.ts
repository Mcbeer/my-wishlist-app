import { nanoid } from "nanoid";
import { IWishlist, IWishlistInputData } from "../../models/IWishlist";
import { getDefaultSettingsObject } from "../../utils/getDefaultSettingsObject";
import { createDocumentClient } from "../createDocumentClient";

const client = createDocumentClient();

export const putWishlistToDb = async (
  wishlistData: IWishlistInputData
): Promise<IWishlist> => {
  const params = {
    TableName: process.env.WISHLISTS_TABLE || "",
    Key: {
      wishlistId: wishlistData.wishlistId,
      wishId: "WISHLIST",
    },
    UpdateExpression:
      "set title = :title, description = :description, settings = :settings",
    ExpressionAttributeValues: {
      ":title": wishlistData.title,
      ":description": wishlistData.description || "",
      ":settings": wishlistData.settings || getDefaultSettingsObject(),
    },
    ReturnValues: "ALL_NEW",
  };

  return client
    .update(params)
    .promise()
    .then((result) => result.Attributes as IWishlist);
};
