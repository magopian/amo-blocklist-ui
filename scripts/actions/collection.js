import Kinto from "kinto";
import btoa from "btoa";
import schemas from "../../schemas";

export const COLLECTION_LOADED = "COLLECTION_LOADED";
export const COLLECTION_BUSY = "COLLECTION_BUSY";
export const COLLECTION_SCHEMA = "COLLECTION_SCHEMA";
export const COLLECTION_ERROR = "COLLECTION_ERROR";
export const COLLECTION_SELECTED = "COLLECTION_SELECTED";

const kinto = new Kinto({
  remote:   "http://0.0.0.0:8888/v1",
  dbPrefix: "user",
  headers:  {Authorization: "Basic " + btoa("user:")}
});

// Sync
export function select(name) {
  return {type: COLLECTION_SELECTED, name};
}

export function loaded(records) {
  return {type: COLLECTION_LOADED, records};
}

export function error(err) {
  return {type: COLLECTION_ERROR, error: err};
}

export function busy(flag) {
  return {type: COLLECTION_BUSY, flag};
}

export function schema(schema) {
  return {type: COLLECTION_SCHEMA, schema};
}

// Async
export function load() {
  return (dispatch, getState) => {
    const collName = getState().collection.name;
    dispatch(schema(schemas[collName]));
    dispatch(busy(true));
    return kinto.collection(collName).list()
      .then(res => dispatch(loaded(res.data)))
      .catch(err => dispatch(error(err)))
      .then(_ => dispatch(busy(false)));
  };
}

export function create(record) {
  return (dispatch, getState) => {
    const collName = getState().collection.name;
    dispatch(busy(true));
    return kinto.collection(collName).create(record)
      .then(res => dispatch(load()))
      .catch(err => dispatch(error(err)))
      .then(_ => dispatch(busy(false)));
  };
}
