export interface DBWishlist {
  ownerId: string;
  title: string;
}

export interface DBWish {
  claimedBy: string;
  description: string;
  imageUrl: string;
  purchaseUrl: string;
  title: string;
}

export interface UserWishlistRelations {
  userId: string;
  wishlistId: string;
}
