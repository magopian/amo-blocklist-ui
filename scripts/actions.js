export default class CollectionActions {
  constructor(name, events) {
    this.name = name;
    this.events = events;
  }

  _emit(event, data) {
    this.events.emit([this.name, event], data);
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

  update(record) {
    this._emit("update", record);
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
