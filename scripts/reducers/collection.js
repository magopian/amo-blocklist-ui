import {
  COLLECTION_BUSY,
  COLLECTION_LOADED,
  COLLECTION_SCHEMA
} from "../actions/collection";

const INITIAL_STATE = {
  busy: false,
  schema: {},
  records: [],
};

export function collection(state = INITIAL_STATE, action) {
  switch (action.type) {
  // XXX listen to INIT action to initiate loading?
  case COLLECTION_BUSY:
    return {...state, busy: action.busy};
  case COLLECTION_LOADED:
    return {...state, records: action.records};
  case COLLECTION_SCHEMA:
    return {...state, schema: action.schema};
  default:
    return state;
  }
}

export default collection;
