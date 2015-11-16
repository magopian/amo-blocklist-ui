import "babel/polyfill";
import React from "react";
import Kinto from "kinto";
import Store from "./store";
import EventEmitter from "eventemitter2";
import schemas from "../schemas";
import App from "./components/App";
import btoa from "btoa";
import CollectionActions from "./actions";

import "../css/styles.css";

const events = new EventEmitter({wildcard: true, delimiter: ":"});
const kinto = new Kinto({
  remote:   "http://0.0.0.0:8888/v1",
  dbPrefix: "user",
  headers:  {Authorization: "Basic " + btoa("user:")}
});
const collections = {
  addons: {
    label: "Addons",
    displayFields: ["addonId"],
    schema: schemas.addons,
    store: new Store(kinto, "addons", events),
    actions: new CollectionActions("addons", events),
  },
  certificates: {
    label: "Certificates",
    displayFields: ["issuerName"],
    schema: schemas.certificates,
    store: new Store(kinto, "certificates", events),
    actions: new CollectionActions("certificates", events),
  },
  gfx: {
    label: "Gfx",
    displayFields: ["os", "vendor", "feature"],
    schema: schemas.gfx,
    store: new Store(kinto, "gfx", events),
    actions: new CollectionActions("gfx", events),
  },
  plugins: {
    label: "Plugins",
    displayFields: ["matchName", "matchFilename", "matchDescription"],
    schema: schemas.plugins,
    store: new Store(kinto, "plugins", events),
    actions: new CollectionActions("plugins", events),
  }
};

React.render((
  <App events={events}
       collections={collections}
       defaultCollection="addons" />
), document.getElementById("app"));
