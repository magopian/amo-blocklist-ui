import { combineReducers } from "redux";
import collection from "./collection";
import collections from "./collections";
import notifications from "./notifications";
import form from "./form";

const rootReducer = combineReducers({
  collection,
  collections,
  notifications,
  form,
});

export default rootReducer;
