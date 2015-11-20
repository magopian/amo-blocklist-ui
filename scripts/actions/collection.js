import Kinto from "kinto";
import btoa from "btoa";
import schemas from "../../schemas";

import * as NotificationsActions from "./notifications";
import * as FormActions from "./form";

export const COLLECTION_LOADED = "COLLECTION_LOADED";
export const COLLECTION_BUSY = "COLLECTION_BUSY";
export const COLLECTION_READY = "COLLECTION_READY";

const kinto = new Kinto({
  remote:   "http://0.0.0.0:8888/v1",
  // XXX for custom bucket, need creation
  // bucket: "blocklist",
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

function busy(flag) {
  return {type: COLLECTION_BUSY, flag};
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
  dispatch(NotificationsActions.clearNotifications());
  dispatch(busy(true));
  return Promise.resolve(promise)
    .then(res => {
      if (options.message) {
        dispatch(NotificationsActions.notifyInfo(options.message));
      }
      dispatch(busy(false));
      dispatch(load());
    })
    .catch(err => {
      dispatch(NotificationsActions.notifyError(err));
    });
}

export function load() {
  return withCollection((dispatch, collection) => {
    dispatch(busy(true));
    return collection.list()
      .then(res => dispatch(loaded(res.data)))
      .catch(err => dispatch(NotificationsActions.notifyError(err)));
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
