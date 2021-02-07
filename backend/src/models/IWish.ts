export interface IWish {
  wishId: string;
  title: string;
  description: string;
  imageUrl: string;
  purchaseUrl: string;
  claimedBy?: null | string;
  createdAt?: string;
  updatedAt?: string;
  claimedAt?: string;
}

export interface IDBWish extends IWish {
  wishlistId: string;
}
