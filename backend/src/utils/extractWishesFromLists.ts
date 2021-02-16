import { IWishlist } from "../models/IWishlist";

// TODO : Fix the any[]
export const extractWishesFromLists = (queriedData: any[]): IWishlist => {
  const wishlist = queriedData.find((x: any) => x.wishId === "WISHLIST");

  return {
    ...wishlist,
  };
};
