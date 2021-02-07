import { IWish } from "./IWish";

export interface IWishlist {
  wishlistId: string;
  title: string;
  description: string;
  settings: IWishlistSettings;
  listRole: WishlistRoles;
  wishes: IWish[];
}

export interface IWishlistSettings {
  claimsViewable?: boolean;
  multiClaim?: boolean;
  // Don't know about this value, maybe, maybe not
  publiclyViewable?: boolean;
}

export interface IWishlistInputData {
  wishlistId: string;
  title: string;
  description?: string;
  settings?: IWishlistSettings;
}

export interface IWishlistBindDetails {
  userId: string;
  wishlistId: string;
  listRole: WishlistRoles;
}

export enum WishlistRoles {
  OWNER = "OWNER",
  MEMBER = "MEMBER",
}
