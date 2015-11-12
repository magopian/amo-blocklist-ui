import Kinto from "kinto";

export default class Store {
  constructor(kinto, collName, events) {
    this.kinto = kinto;
    this.collName = collName;
    this.events = events;
    this.state = {busy: false, error: null, records: []};
    this.collection = this.kinto.collection(collName);
    this.events.on(this.collName + ":create", this.create.bind(this));
    this.events.on(this.collName + ":update", this.update.bind(this));
    this.events.on(this.collName + ":delete", this.delete.bind(this));
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

  onError(error) {
    this.setState({busy: false, error: null});
  }

  _execute(promise) {
    this.setState({busy: true});
    return promise.then(_ => this.collection.list())
      .then(res => this.setState({busy: false, error: null, records: res.data}))
      .catch(this.onError.bind(this));
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

  sync() {
    return this._execute(this.collection.sync({
      strategy: Kinto.syncStrategy.SERVER_WINS
    }));
  }
}
