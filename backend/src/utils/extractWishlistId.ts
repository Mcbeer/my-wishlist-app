export const extractWishlistId = (wishlistId: string): string | null => {
  if (wishlistId.includes("#")) {
    return wishlistId.split("#")[1];
  } else {
    return null;
  }
};
