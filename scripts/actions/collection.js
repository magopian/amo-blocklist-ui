import Kinto from "kinto";
import btoa from "btoa";
import schemas from "../../schemas";

export const COLLECTION_LOADED = "COLLECTION_LOADED";
export const COLLECTION_BUSY = "COLLECTION_BUSY";
export const COLLECTION_SCHEMA = "COLLECTION_SCHEMA";
export const COLLECTION_ERROR = "COLLECTION_ERROR";
export const COLLECTION_SELECTED = "COLLECTION_SELECTED";
export const COLLECTION_MESSAGE = "COLLECTION_MESSAGE";

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

export function message(message) {
  if (message) {
    return {type: COLLECTION_MESSAGE, message};
  }
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

function execute(dispatch, promise, options = {}) {
  dispatch(busy(true));
  return Promise.resolve(promise)
    .catch(err => dispatch(error(err)))
    .then(res => {
      dispatch(message(options.message));
      dispatch(busy(false));
      dispatch(load());
    });
}

export function load() {
  return withCollection((dispatch, collection) => {
    dispatch(busy(true));
    return collection.list()
      .catch(err => dispatch(error(err)))
      .then(res => {
        dispatch(busy(false));
        dispatch(loaded(res.data));
      });
  });
}

export function create(record) {
  return withCollection((dispatch, collection) => {
    return execute(dispatch, collection.create(record), {
      message: "The record has been created."
    });
  });
}

export function update(record) {
  return withCollection((dispatch, collection) => {
    return execute(dispatch, collection.update(record), {
      message: `Record ${record.id} has been updated.`
    });
  });
}

export function deleteRecord(id) {
  return withCollection((dispatch, collection) => {
    return execute(dispatch, collection.delete(id), {
      message: `Record ${id} has been deleted.`
    });
  });
}

export function sync(options) {
  return withCollection((dispatch, collection) => {
    return execute(dispatch, collection.sync(options), {
      message: "The collection has been synchronized."
    });
  });
}

export function resetSync() {
  return withCollection((dispatch, collection) => {
    return execute(dispatch, collection.resetSync(), {
      message: "All local record sync statuses have been reset."
    });
  });
}
