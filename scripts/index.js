import "babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import routes from "./routes";
import configureStore from "./store/configureStore";
const createHashHistory = require("history/lib/createHashHistory");
const { syncReduxAndRouter } = require("./redux-router");

import "../css/styles.css";

const history = createHashHistory();
const store = configureStore();

syncReduxAndRouter(history, store);

render((
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
), document.getElementById("app"));
