import { IWishlist } from "../../models/IWishlist";
import { extractWishesFromLists } from "../../utils/extractWishesFromLists";
import { createDocumentClient } from "../createDocumentClient";

const client = createDocumentClient();

export const getWishlistsByIds = async (
  wishlistIds: string[]
): Promise<IWishlist[]> => {
  const wishlists = wishlistIds.map((wishlistId) => {
    const params = {
      TableName: process.env.WISHLISTS_TABLE || "",
      KeyConditionExpression:
        "wishlistId = :wishlistId and begins_with(wishId, :wishId)",
      ExpressionAttributeValues: {
        ":wishlistId": wishlistId,
        ":wishId": "WISHLIST",
      },
    };

    return client
      .query(params)
      .promise()
      .then((result) => {
        console.log(result);
        return result && result.Items;
      })
      .then((items) => {
        if (items && items.length > 0) {
          return items;
        } else {
          return [];
        }
      });
  });

  // Cast the type to unknown, since we know the exact data pattern, but typescript hates us and thinks its an itemlist from dynamodb...
  return Promise.all(wishlists).then((lists: unknown[]) => {
    if (lists) {
      return lists as IWishlist[];
    } else {
      return [];
    }
  });
};
