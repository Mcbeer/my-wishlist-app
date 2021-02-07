export const extractWishlistId = (wishlistId: string): string => {
  return wishlistId.split("#")[1];
};
