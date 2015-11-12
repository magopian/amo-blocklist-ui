import Kinto from "kinto";

export default class Store {
  constructor(kinto, collName, events) {
    this.kinto = kinto;
    this.collName = collName;
    this.events = events;
    this.state = {busy: false, error: null, records: []};
    this.collection = this.kinto.collection(collName);
    this._subscribe("create", this.create.bind(this));
    this._subscribe("update", this.update.bind(this));
    this._subscribe("delete", this.delete.bind(this));
    this._subscribe("load", this.load.bind(this));
    this._subscribe("sync", this.sync.bind(this));
  }

  getState() {
    return this.state;
  }

  setState(state) {
    for (let prop in state) {
      this.state[prop] = state[prop];
    }
    this.events.emit(this.collName + ":change", this.state);
  }

  _subscribe(storeEvent, listener) {
    return this.events.on(this.collName + ":" + storeEvent, listener);
  }

  _execute(promise) {
    this.setState({busy: true});
    return Promise.resolve(promise)
      .then(_ => this.collection.list())
      .then(res => this.setState({busy: false, error: null, records: res.data}))
      .catch(error => this.setState({busy: false, error}));
  }

  create(record) {
    return this._execute(this.collection.create(record));
  }

  update(record) {
    return this._execute(this.collection.update(record));
  }

  delete(record) {
    return this._execute(this.collection.delete(record.id));
  }

  load() {
    return this._execute();
  }

  sync() {
    return this._execute(this.collection.sync({
      strategy: Kinto.syncStrategy.SERVER_WINS
    }));
  }
}
