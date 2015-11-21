import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import Sidebar from "./containers/Sidebar";
import Notifications from "./containers/Notifications";
import CollectionListPage from "./containers/CollectionListPage";
import AddFormPage from "./containers/AddFormPage";
import EditFormPage from "./containers/EditFormPage";
import SettingsPage from "./containers/SettingsPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute components={{
      notifications: Notifications,
      content: HomePage,
      sidebar: Sidebar,
    }} />
    <Route path="/collections/:name" components={{
      notifications: Notifications,
      content: CollectionListPage,
      sidebar: Sidebar,
    }} />
    <Route path="/collections/:name/add" components={{
      notifications: Notifications,
      content: AddFormPage,
      sidebar: Sidebar,
    }} />
    <Route path="/collections/:name/edit/:id" components={{
      notifications: Notifications,
      content: EditFormPage,
      sidebar: Sidebar,
    }} />
    <Route path="/settings" components={{
      notifications: Notifications,
      content: SettingsPage,
      sidebar: Sidebar,
    }} />
    <Route path="*" components={{
      sidebar: Sidebar,
      content: _ => <h1>Page not found.</h1>
    }}/>
  </Route>
);
