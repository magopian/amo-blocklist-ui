import { combineReducers } from "redux";
import collection from "./collection";
import collections from "./collections";
import form from "./form";

const rootReducer = combineReducers({
  collection,
  collections,
  form,
});

export default rootReducer;
