export default class CollectionActions {
  constructor(name, events) {
    this.name = name;
    this.events = events;
  }

  _emit(event, ...args) {
    this.events.emit.apply(this.events, [[this.name, event], ...args]);
  }

  add() {
    this._emit("add");
  }

  create(record) {
    this._emit("create", record);
  }

  edit(record) {
    this._emit("edit", record);
  }

  update(id, record) {
    this._emit("update", id, record);
  }

  delete(id) {
    this._emit("delete", id);
  }

  load() {
    this._emit("load");
  }

  sync(options) {
    this._emit("sync", options);
  }

  resetSync() {
    this._emit("resetSync");
  }
}
