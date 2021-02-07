import { Request, Response } from "express";
import { getWishlistIdsByUserId } from "../../db/wishlist/getWishlistIdsByUserId";
import { getWishlistsByIds } from "../../db/wishlist/getWishlistsByIds";
import { perhaps } from "../../utils/perhaps";
import { respondError, respondSuccess } from "../../utils/respond";

export const getUserWishlists = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const [wishlistsError, wishlistIds] = await perhaps(
    getWishlistIdsByUserId(userId)
  );

  if (wishlistsError) {
    respondError({
      res,
      statusCode: 500,
      error: new Error("ERROR.WISHLISTS_IDS_ERROR"),
    });
    return;
  }

  if (!wishlistIds) {
    respondError({
      res,
      statusCode: 500,
      error: new Error("ERROR.WISHLISTS_IDS_ERROR"),
    });
    return;
  }

  const [wishlistQueryError, wishlists] = await perhaps(
    getWishlistsByIds(wishlistIds)
  );

  if (wishlistQueryError) {
    console.log(wishlistQueryError.message);
    respondError({
      res,
      statusCode: 500,
      error: new Error("ERROR.WISHLISTS_LIST_ERROR"),
    });
    return;
  }

  respondSuccess({ res, data: wishlists });
  return;
};
