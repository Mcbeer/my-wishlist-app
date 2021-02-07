import { DefaultRootState } from "react-redux";

export interface StoreModel extends DefaultRootState {
  user: StateModel<UserState>;
  lists: StateModel<ListState[]>;
  wishes: StateModel<WishState[]>;
}

export interface ActionModel {
  type: string;
  payload: any;
}

export interface StateModel<T> {
  error: Error | null;
  loading: boolean;
  lastFetched: number;
  data: T;
}

export interface UserState {
  authenticated: boolean;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
}

export interface ListState {
  listId: string;
  title: string;
  description: string;
  owner: string;
}

export interface WishState {
  wishId: string;
  wishlistId: string;
  title: string;
  description: string;
  purchaseUrl: string;
  avatarUrl: string;
  claimedBy: WishStateClaimed | null;
}

export interface WishStateClaimed {
  userId: string;
  userName: string;
}
