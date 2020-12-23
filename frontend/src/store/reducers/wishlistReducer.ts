import { ActionModel, StoreModel } from "../../models/Store";

const initialState: StoreModel["wishlists"] = [];

export const wishlistReducer = (
  state = initialState,
  { type, payload }: ActionModel
) => {
  switch (type) {
    default:
      return state;
  }
};
