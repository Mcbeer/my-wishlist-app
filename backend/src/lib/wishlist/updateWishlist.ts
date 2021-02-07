import { Request, Response } from "express";
import { putWishlistToDb } from "../../db/wishlist/putWishlistToDb";
import { IWishlistInputData } from "../../models/IWishlist";
import { perhaps } from "../../utils/perhaps";
import { respondError, respondSuccess } from "../../utils/respond";

export const updateWishlist = async (req: Request, res: Response) => {
  const wishlistData: IWishlistInputData = req.body;

  console.log({ wishlistData });

  const [updatedWishlistError, updatedWishlist] = await perhaps(
    putWishlistToDb(wishlistData)
  );

  if (updatedWishlistError) {
    console.log(updatedWishlistError);

    respondError({
      res,
      error: new Error("ERROR.WISHLIST_UPDATE_ERROR"),
    });

    return;
  }

  if (!updatedWishlist) {
    console.log("Wishlist was not updated");
    console.log({ wishlistData });

    respondError({
      res,
      error: new Error("ERROR.WISHLIST_UPDATE_ERROR"),
    });

    return;
  }

  respondSuccess({
    res,
    data: updatedWishlist,
  });
  return;
};
