import { IWishlistSettings } from "../models/IWishlist";

export const getDefaultSettingsObject = (): IWishlistSettings => {
  return {
    claimsViewable: false,
    multiClaim: false,
    publiclyViewable: false,
  };
};
