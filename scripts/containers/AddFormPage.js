import React, { Component } from "react";

export default class HomePage extends Component {
  render() {
    const {name} = this.props.params;
    return <div>
      <h1>{name}</h1>
      <p>form here.</p>
    </div>;
  }
}
