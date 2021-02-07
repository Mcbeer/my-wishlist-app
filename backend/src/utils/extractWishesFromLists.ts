import { formatWish } from "./formatWish";

export const extractWishesFromLists = (queriedData: any[]) => {
  const wishlist = queriedData.find((x: any) => x.wishId === "WISHLIST");

  const wishes = queriedData.filter((x) => x.wishId !== "WISHLIST");

  const formattedWishes = wishes.map(formatWish);

  return {
    ...wishlist,
    wishes,
  };
};
