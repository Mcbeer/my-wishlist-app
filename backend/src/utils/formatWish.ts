import { IDBWish, IWish } from "../models/IWish";

export const formatWish = (wish: IDBWish): IWish => {
  const { wishlistId, ...rest } = wish;
  return {
    ...rest,
  };
};
