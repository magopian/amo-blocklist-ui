import { expect } from "chai";
import sinon from "sinon";
import KintoCollection from "kinto/lib/collection";
import schemas from "../../schemas";
import collectionReducer from "../../scripts/reducers/collection";
import collectionsReducer from "../../scripts/reducers/collections";
import * as actions from "../../scripts/actions/collection";
import * as NotificationsActions from "../../scripts/actions/notifications";

describe("collection actions", () => {
  var sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("configure()", () => {
    it("should retrieve the collection schema", () => {
      expect(actions.configure("addons", {}).schema)
        .eql(schemas.addons);
    });
  });

  describe("select()", () => {
    it("should select and configure a collection", () => {
      const collections = collectionsReducer();
      const dispatch = sandbox.spy();
      const getState = () => ({collections});

      actions.select("addons")(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: actions.COLLECTION_READY,
        name: "addons",
        schema: schemas.addons,
        config: collections.addons.config,
      });
    });

    it("should dispatch an error notification on failure", () => {
      const collections = {};
      const dispatch = sandbox.spy();
      const getState = () => ({collections});
      const notifyError = sinon.stub(NotificationsActions, "notifyError");

      actions.select("foo")(dispatch, getState);

      sinon.assert.calledWith(notifyError,
        new Error("Collection \"foo\" is not available."));
    });
  });

  describe("load()", () => {
    var dispatch, getState;

    beforeEach(() => {
      const collections = collectionsReducer();
      const collection = collectionReducer({name: "addons"}, {type: null});
      dispatch = sandbox.spy();
      getState = () => ({
        collections,
        collection,
      });
    });

    it("should mark the collection as busy", () => {
      actions.load()(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: actions.COLLECTION_BUSY,
        flag: true,
      });
    });

    it("should load the collection", (done) => {
      sandbox.stub(KintoCollection.prototype, "list").returns(
        Promise.resolve({data: [{a: 1}]}));

      actions.load()(dispatch, getState);

      setImmediate(() => {
        sinon.assert.calledWith(dispatch, {
          type: actions.COLLECTION_LOADED,
          records: [{a: 1}],
        });
        done();
      });
    });
  });

  describe("create()", () => {
    var dispatch, getState;

    beforeEach(() => {
      const collections = collectionsReducer();
      const collection = collectionReducer({name: "addons"}, {type: null});
      dispatch = sandbox.spy();
      getState = () => ({
        collections,
        collection,
      });
    });

    it("should mark the collection as busy", () => {
      actions.load()(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: actions.COLLECTION_BUSY,
        flag: true,
      });
    });

    it("should create the record", () => {
      const create = sandbox.stub(KintoCollection.prototype, "create").returns(
        Promise.resolve());

      actions.create({foo: "bar"})(dispatch, getState);

      sinon.assert.calledWith(create, {foo: "bar"});
    });

    it("should clear notifications", () => {
      sandbox.stub(KintoCollection.prototype, "create").returns(
        Promise.resolve());

      actions.create({foo: "bar"})(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: NotificationsActions.NOTIFICATION_CLEAR,
      });
    });
  });

  describe("update()", () => {
    var dispatch, getState;

    beforeEach(() => {
      const collections = collectionsReducer();
      const collection = collectionReducer({name: "addons"}, {type: null});
      dispatch = sandbox.spy();
      getState = () => ({
        collections,
        collection,
      });
    });

    it("should mark the collection as busy", () => {
      actions.load()(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: actions.COLLECTION_BUSY,
        flag: true,
      });
    });

    it("should update the record", () => {
      const update = sandbox.stub(KintoCollection.prototype, "update").returns(
        Promise.resolve());

      actions.update({foo: "bar"})(dispatch, getState);

      sinon.assert.calledWith(update, {foo: "bar"});
    });

    it("should clear notifications", () => {
      sandbox.stub(KintoCollection.prototype, "update").returns(
        Promise.resolve());

      actions.update({foo: "bar"})(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: NotificationsActions.NOTIFICATION_CLEAR,
      });
    });
  });

  describe("deleteRecord()", () => {
    var dispatch, getState;

    beforeEach(() => {
      const collections = collectionsReducer();
      const collection = collectionReducer({name: "addons"}, {type: null});
      dispatch = sandbox.spy();
      getState = () => ({
        collections,
        collection,
      });
    });

    it("should mark the collection as busy", () => {
      actions.load()(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: actions.COLLECTION_BUSY,
        flag: true,
      });
    });

    it("should deleteRecord the record", () => {
      const deleteRecord = sandbox.stub(KintoCollection.prototype, "delete")
        .returns(Promise.resolve());

      actions.deleteRecord(42)(dispatch, getState);

      sinon.assert.calledWith(deleteRecord, 42);
    });

    it("should clear notifications", () => {
      sandbox.stub(KintoCollection.prototype, "delete").returns(
        Promise.resolve());

      actions.deleteRecord(42)(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: NotificationsActions.NOTIFICATION_CLEAR,
      });
    });
  });

  describe("sync()", () => {
    var dispatch, getState;

    beforeEach(() => {
      const collections = collectionsReducer();
      const collection = collectionReducer({name: "addons"}, {type: null});
      dispatch = sandbox.spy();
      getState = () => ({
        collections,
        collection,
      });
    });

    it("should mark the collection as busy", () => {
      actions.load()(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: actions.COLLECTION_BUSY,
        flag: true,
      });
    });

    it("should sync the record", () => {
      const sync = sandbox.stub(KintoCollection.prototype, "sync")
        .returns(Promise.resolve());

      actions.sync()(dispatch, getState);

      sinon.assert.calledOnce(sync);
    });

    it("should clear notifications", () => {
      sandbox.stub(KintoCollection.prototype, "sync").returns(
        Promise.resolve());

      actions.sync()(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: NotificationsActions.NOTIFICATION_CLEAR,
      });
    });
  });

  describe("resetSync()", () => {
    var dispatch, getState;

    beforeEach(() => {
      const collections = collectionsReducer();
      const collection = collectionReducer({name: "addons"}, {type: null});
      dispatch = sandbox.spy();
      getState = () => ({
        collections,
        collection,
      });
    });

    it("should mark the collection as busy", () => {
      actions.load()(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: actions.COLLECTION_BUSY,
        flag: true,
      });
    });

    it("should resetSync the record", () => {
      const resetSyncStatus = sandbox.stub(
        KintoCollection.prototype, "resetSyncStatus")
        .returns(Promise.resolve());

      actions.resetSync()(dispatch, getState);

      sinon.assert.calledOnce(resetSyncStatus);
    });

    it("should clear notifications", () => {
      sandbox.stub(KintoCollection.prototype, "resetSyncStatus").returns(
        Promise.resolve());

      actions.resetSync()(dispatch, getState);

      sinon.assert.calledWith(dispatch, {
        type: NotificationsActions.NOTIFICATION_CLEAR,
      });
    });
  });
});
