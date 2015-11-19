import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import Sidebar from "./containers/Sidebar";
import CollectionListPage from "./containers/CollectionListPage";
import AddFormPage from "./containers/AddFormPage";
import EditFormPage from "./containers/EditFormPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute components={{
      content: HomePage,
      sidebar: Sidebar,
    }} />
    <Route path="/collections/:name" components={{
      content: CollectionListPage,
      sidebar: Sidebar,
    }} />
    <Route path="/collections/:name/add" components={{
      content: AddFormPage,
      sidebar: Sidebar,
    }} />
    <Route path="/collections/:name/edit/:id" components={{
      content: EditFormPage,
      sidebar: Sidebar,
    }} />
  </Route>
);
