import { ActionModel, StateModel, UserState } from "../../Models/Store";

const initialState: StateModel<UserState> = {
  loading: false,
  error: null,
  lastFetched: 0,
  data: {
    authenticated: false,
    userId: "",
    lastName: "",
    firstName: "",
    email: "",
    avatarUrl: "",
  },
};

export const userReducer = (state = initialState, action: ActionModel) => {
  switch (action.type) {
    default:
      return state;
  }
};
