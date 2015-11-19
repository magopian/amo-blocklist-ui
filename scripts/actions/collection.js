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

function getCollection(collName) {
  return kinto.collection(collName);
}

// Async
function withCollection(fn) {
  return (dispatch, getState) => {
    const collName = getState().collection.name;
    const collection = kinto.collection(collName);
    dispatch(schema(schemas[collName]));
    return fn(dispatch, collection);
  };
}

// function execute(fn) {
//   return withCollection((dispatch, collection) => {
//     dispatch(busy(true));
//   });
// }

export function load() {
  return withCollection((dispatch, collection) => {
    dispatch(busy(true));
    return collection.list()
      .then(res => dispatch(loaded(res.data)))
      .catch(err => dispatch(error(err)))
      .then(_ => dispatch(busy(false)));
  });
}

export function create(record) {
  return withCollection((dispatch, collection) => {
    dispatch(busy(true));
    return collection.create(record)
      .then(res => dispatch(load()))
      .catch(err => dispatch(error(err)))
      .then(_ => dispatch(busy(false)));
  });
}

export function deleteRecord(id) {
  return withCollection((dispatch, collection) => {
    dispatch(busy(true));
    return collection.delete(id)
      .then(res => dispatch(load()))
      .catch(err => dispatch(error(err)))
      .then(_ => dispatch(busy(false)));
  });
}
