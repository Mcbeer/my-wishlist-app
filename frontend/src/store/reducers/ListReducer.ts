import { ActionModel, ListState, StateModel } from "../../Models/Store";

const initialState: StateModel<ListState[]> = {
  loading: false,
  error: null,
  lastFetched: 0,
  data: [
    {
      listId: "abc123",
      title: "Test List #1",
      description: "Dette er min test list",
      owner: "Test Bruger",
    },
    {
      listId: "def456",
      title: "Test List #2",
      description: "Dette er min test list",
      owner: "Test Bruger",
    },
  ],
};

export const listReducer = (state = initialState, action: ActionModel) => {
  switch (action.type) {
    default:
      return state;
  }
};
