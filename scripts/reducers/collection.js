import {
  COLLECTION_BUSY,
  COLLECTION_LOADED,
  COLLECTION_SCHEMA,
  COLLECTION_SELECTED
} from "../actions/collection";

const INITIAL_STATE = {
  name: null,
  busy: false,
  schema: {},
  records: [],
};

export function collection(state = INITIAL_STATE, action) {
  switch (action.type) {
  case COLLECTION_SELECTED:
    return {...state, name: action.name};
  case COLLECTION_BUSY:
    return {...state, busy: action.flag};
  case COLLECTION_LOADED:
    return {...state, records: action.records};
  case COLLECTION_SCHEMA:
    return {...state, schema: action.schema};
  default:
    return state;
  }
}

export default collection;
