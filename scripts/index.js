import "babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import routes from "./routes";
import configureStore from "./store/configureStore";

import "../css/styles.css";

const store = configureStore();

render((
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>
), document.getElementById("app"));
