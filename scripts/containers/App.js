import React, { Component } from "react";

export default class App extends Component {
  render() {
    const {content, sidebar} = this.props;
    return (
      <div className="main">
        <div className="sidebar">
          {sidebar || <p>Sidebar.</p>}
        </div>
        <div className="content">
          {content || <p>Default.</p>}
        </div>
      </div>
    );
  }
}

