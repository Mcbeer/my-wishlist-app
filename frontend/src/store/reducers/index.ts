import { combineReducers } from "redux";
import { listReducer } from "./ListReducer";
import { userReducer } from "./UserReducer";
import { wishReducer } from "./WishReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  lists: listReducer,
  wishes: wishReducer,
});
