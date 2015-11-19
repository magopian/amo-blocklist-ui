import Kinto from "kinto";
import btoa from "btoa";
import schemas from "../../schemas";

export const COLLECTION_LOADED = "COLLECTION_LOADED";
export const COLLECTION_BUSY = "COLLECTION_BUSY";
export const COLLECTION_SCHEMA = "COLLECTION_SCHEMA";
export const COLLECTION_ERROR = "COLLECTION_ERROR";

const kinto = new Kinto({
  remote:   "http://0.0.0.0:8888/v1",
  dbPrefix: "user",
  headers:  {Authorization: "Basic " + btoa("user:")}
});

// Sync
export function loaded(records) {
  return {type: COLLECTION_LOADED, records};
}

export function error(err) {
  return {type: COLLECTION_ERROR, error: err};
}

export function busy(flag) {
  return {type: COLLECTION_BUSY, busy};
}

export function schema(schema) {
  return {type: COLLECTION_SCHEMA, schema};
}

// Async
export function load(name) {
  return dispatch => {
    dispatch(schema(schemas[name]));
    dispatch(busy(true));
    return kinto.collection(name).list()
      .then(res => {
        dispatch(busy(false));
        dispatch(loaded(res.data));
      })
      .catch(err => {
        dispatch(error(err));
      });
  };
}
