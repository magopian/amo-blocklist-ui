import Kinto from "kinto";
import btoa from "btoa";
import schemas from "../../schemas";

import * as FormActions from "./form";

export const COLLECTION_LOADED = "COLLECTION_LOADED";
export const COLLECTION_BUSY = "COLLECTION_BUSY";
export const COLLECTION_ERROR = "COLLECTION_ERROR";
export const COLLECTION_READY = "COLLECTION_READY";
export const COLLECTION_MESSAGE = "COLLECTION_MESSAGE";

const kinto = new Kinto({
  remote:   "http://0.0.0.0:8888/v1",
  dbPrefix: "user",
  headers:  {Authorization: "Basic " + btoa("user:")}
});

// Sync
function configure(name, config) {
  return {
    type: COLLECTION_READY,
    name,
    config,
    schema: schemas[name],
  };
}

function loaded(records) {
  return {type: COLLECTION_LOADED, records};
}

function error(err) {
  return {type: COLLECTION_ERROR, error: err};
}

function busy(flag) {
  return {type: COLLECTION_BUSY, flag};
}

function message(message) {
  return {type: COLLECTION_MESSAGE, message};
}

// Async
export function select(name, config = {}) {
  return (dispatch, getState) => {
    // XXX error message if no config
    const config = getState().collections[name].config;
    dispatch(configure(name, config));
  };
}

function withCollection(fn) {
  return (dispatch, getState) => {
    const collName = getState().collection.name;
    if (!collName) {
      // XXX error message instead?
      throw new Error("Missing collection name.");
    }
    return fn(dispatch, kinto.collection(collName));
  };
}

function execute(dispatch, promise, options = {}) {
  dispatch(busy(true));
  dispatch(message(null));
  return Promise.resolve(promise)
    .catch(err => dispatch(error(err)))
    .then(res => {
      dispatch(message(options.message || null));
      dispatch(busy(false));
      dispatch(load());
    });
}

export function load() {
  return withCollection((dispatch, collection) => {
    dispatch(busy(true));
    return collection.list()
      .catch(err => dispatch(error(err)))
      .then(res => dispatch(loaded(res.data)));
  });
}

export function loadRecord(id) {
  return withCollection((dispatch, collection) => {
    return collection.get(id)
      .then(res => dispatch(FormActions.recordLoaded(res.data)));
  });
}

export function create(record) {
  return withCollection((dispatch, collection) => {
    return execute(dispatch, collection.create(record), {
      message: "The record has been created.",
    });
  });
}

export function update(record) {
  return withCollection((dispatch, collection) => {
    return execute(dispatch, collection.update(record), {
      message: `Record ${record.id} has been updated.`,
    });
  });
}

export function deleteRecord(id) {
  return withCollection((dispatch, collection) => {
    return execute(dispatch, collection.delete(id), {
      message: `Record ${id} has been deleted.`,
    });
  });
}

export function sync(options) {
  return withCollection((dispatch, collection) => {
    return execute(dispatch, collection.sync(options), {
      message: "The collection has been synchronized.",
    });
  });
}

export function resetSync() {
  return withCollection((dispatch, collection) => {
    return execute(dispatch, collection.resetSyncStatus(), {
      message: "All local record sync statuses have been reset.",
    });
  });
}
