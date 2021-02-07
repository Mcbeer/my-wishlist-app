import { Request, Response } from "express";
import { deleteWishlistEntry } from "../../db/wishlist/deleteWishlistEntry";
import { unbindWishlistFromUser } from "../../db/wishlist/unbindWishlistFromUser";
import { getRequesterId } from "../../utils/getRequesterId";
import { perhaps } from "../../utils/perhaps";
import { respondError, respondSuccess } from "../../utils/respond";

export const deleteWishlist = async (req: Request, res: Response) => {
  const wishlistId = req.params.wishlistId || "";
  const requesterId = getRequesterId(req);

  const [unboundWishlistError, unboundStatus] = await perhaps(
    unbindWishlistFromUser(wishlistId, requesterId)
  );

  if (unboundWishlistError) {
    console.log(unboundWishlistError);
    respondError({
      res,
      statusCode: 500,
      error: new Error("ERROR.WISHLIST_UNBOUND_ERROR"),
    });
    return;
  }

  if (!unboundStatus) {
    console.log(
      "Wishlist was not unbound, maybe the user id is not the owner of the wishlist?"
    );
    console.log(wishlistId, requesterId);

    respondError({
      res,
      statusCode: 500,
      error: new Error("ERROR.WISHLIST_UNBOUND_ERROR"),
    });
    return;
  }

  const [removeWishlistEntryError, wasDeleted] = await perhaps(
    deleteWishlistEntry(wishlistId)
  );

  if (removeWishlistEntryError) {
    console.log(removeWishlistEntryError);
    respondError({
      res,
      error: new Error("ERROR.WISHLIST_ENTRY_ERROR"),
      statusCode: 500,
    });
    return;
  }

  if (!wasDeleted) {
    respondError({
      res,
      error: new Error("ERROR.WISHLIST_ENTRY_ERROR"),
      statusCode: 500,
    });
    return;
  }

  respondSuccess({
    res,
    data: wasDeleted,
  });
  return;
};
