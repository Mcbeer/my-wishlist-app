import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./Reducers";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(rootReducer, composedEnhancer);
