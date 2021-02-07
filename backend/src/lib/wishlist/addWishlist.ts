import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { bindWishlistToUser } from "../../db/wishlist/bindWishlistToUser";
import { putWishlistToDb } from "../../db/wishlist/putWishlistToDb";
import { IWishlistInputData, WishlistRoles } from "../../models/IWishlist";
import { getRequesterId } from "../../utils/getRequesterId";
import { perhaps } from "../../utils/perhaps";
import { respondError, respondSuccess } from "../../utils/respond";
import { deleteWishlistEntry } from "../../db/wishlist/deleteWishlistEntry";

export const addWishlist = async (req: Request, res: Response) => {
  const wishlistData: IWishlistInputData = req.body;
  const requesterId = getRequesterId(req);
  const wishlistId = nanoid(12);

  const scrubbedData = {
    ...wishlistData,
    wishlistId,
  };

  const [addWishlistError, wishlistObject] = await perhaps(
    putWishlistToDb(scrubbedData)
  );

  if (addWishlistError) {
    console.log(addWishlistError);
    respondError({
      res,
      error: new Error("ERROR.ADD_WISHLIST_ERROR"),
      statusCode: 500,
    });
    return;
  }

  const [boundToUserError, boundDetails] = await perhaps(
    bindWishlistToUser(wishlistId, requesterId, WishlistRoles.OWNER)
  );

  if (boundToUserError) {
    const [removeWishlistEntryError] = await perhaps(
      deleteWishlistEntry(wishlistId)
    );

    if (removeWishlistEntryError) {
      console.log(
        `Wishlist with ID: ${wishlistId} was not removed properly, please fix this`
      );
      console.log(removeWishlistEntryError);
    }
    // Remove the wishlist from wishesTable
    respondError({
      res,
      error: new Error("ERROR.BIND_WISHLIST_ERROR"),
      statusCode: 500,
    });
    return;
  }

  respondSuccess({
    res,
    data: { ...wishlistObject, listRole: boundDetails?.listRole },
  });
  return;
};
