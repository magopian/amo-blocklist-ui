import Kinto from "kinto";

const SYNC_DEFAULT_OPTIONS = {
  strategy: Kinto.syncStrategy.SERVER_WINS
};

export default class Store {
  constructor(kinto, collName, events) {
    this.kinto = kinto;
    this.collName = collName;
    this.events = events;
    this.state = {busy: false, error: null, message: null, records: []};
    this.collection = this.kinto.collection(collName);
    this._respondTo("create", this.create.bind(this));
    this._respondTo("update", this.update.bind(this));
    this._respondTo("delete", this.delete.bind(this));
    this._respondTo("load", this.load.bind(this));
    this._respondTo("sync", this.sync.bind(this));
    this._respondTo("resetSync", this.resetSync.bind(this));
    this._respondTo("clearError", this.clearError.bind(this));
    this._respondTo("clearMessage", this.clearMessage.bind(this));
  }

  getState() {
    return this.state;
  }

  setState(state) {
    for (let prop in state) {
      this.state[prop] = state[prop];
    }
    this.events.emit([this.collName, "change"], this.state);
  }

  subscribe(listener) {
    this.events.on([this.collName, "change"], listener);
  }

  unsubscribe() {
    this.events.removeAllListeners([this.collName, "change"]);
  }

  _respondTo(storeEvent, listener) {
    return this.events.on([this.collName, storeEvent], listener);
  }

  _execute(promise, options={message: null}) {
    this.setState({busy: true, message: null});
    return Promise.resolve(promise)
      .then(_ => this.collection.list())
      .then(res => this.setState({
        busy: false,
        error: null,
        records: res.data,
        message: options.message
      }))
      .catch(error => this.setState({busy: false, error, message: null}));
  }

  create(record) {
    return this._execute(this.collection.create(record), {
      message: "The record has been created."
    });
  }

  update(id, record) {
    return this._execute(this.collection.get(id)
      .then(res => {
        const last_modified = res.data.last_modified;
        const updated = Object.assign({}, record, {id, last_modified});
        return this.collection.update(updated);
      }), {
        message: `Record ${id} have been updated.`
      });
  }

  delete(id) {
    return this._execute(this.collection.delete(id), {
      message: `Record ${id} has been deleted.`
    });
  }

  load() {
    return this._execute();
  }

  sync(options=SYNC_DEFAULT_OPTIONS) {
    return this._execute(this.collection.sync(options), {
      message: "The collection has been synchronized."
    });
  }

  resetSync() {
    return this._execute(this.collection.resetSyncStatus(), {
      message: "All local record sync statuses have been resetted."
    });
  }

  clearError() {
    this.setState({error: null});
  }

  clearMessage() {
    this.setState({message: null});
  }
}
