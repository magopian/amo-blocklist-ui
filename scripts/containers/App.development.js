import React, { Component } from "react";
import DevTools from "./DevTools";

export default class App extends Component {
  render() {
    const {sidebar, notifications, content} = this.props;
    return (
      <div className="main">
        <div className="sidebar">
          {sidebar || <p>Sidebar.</p>}
        </div>
        <div className="content">
          {notifications || null}
          {content || <p>Default.</p>}
        </div>
        <DevTools />
      </div>
    );
  }
}
