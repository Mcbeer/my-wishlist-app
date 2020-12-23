import { combineReducers } from "redux";
import { wishlistReducer } from "./wishlistReducer";

export const rootReducer = combineReducers({
  wishlistReducer,
});
