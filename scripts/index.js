import "babel/polyfill";
import React from "react";
import Kinto from "kinto";
import Store from "./store";
import { EventEmitter } from "events";
import schemas from "../schemas";
import App from "./components/App";

import "../css/styles.css";

const kinto = new Kinto({
  remote:   "http://localhost:8000/v1",
  dbPrefix: "user",
  headers:  {}
});
const events = new EventEmitter();
const collections = {
  addons: {
    label: "Addons",
    displayFields: ["addonId"],
    schema: schemas.addons,
    store: new Store(kinto, "addons", events),
  },
  certificates: {
    label: "Certificates",
    displayFields: ["issuerName"],
    schema: schemas.certificates,
    store: new Store(kinto, "certificates", events),
  },
  gfx: {
    label: "Gfx",
    displayFields: ["os", "vendor", "feature"],
    schema: schemas.gfx,
    store: new Store(kinto, "gfx", events),
  },
  plugins: {
    label: "Plugins",
    displayFields: ["matchName", "matchFilename", "matchDescription"],
    schema: schemas.plugins,
    store: new Store(kinto, "plugins", events),
  }
};

React.render((
  <App events={events}
       collections={collections}
       defaultCollection="addons" />
), document.getElementById("app"));
