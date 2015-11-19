import { combineReducers } from "redux";
import collection from "./collection";
import collections from "./collections";

const rootReducer = combineReducers({
  collection,
  collections,
});

export default rootReducer;
