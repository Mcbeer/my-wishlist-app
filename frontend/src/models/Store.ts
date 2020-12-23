import { DefaultRootState } from "react-redux";
import { IWishlist } from "./IWishlist";

export interface StoreModel extends DefaultRootState {
  wishlists: IWishlist[];
  user: unknown;
}

export interface ActionModel {
  type: string;
  payload: any;
}
