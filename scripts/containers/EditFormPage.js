import React, { Component } from "react";

export default class EditFormPage extends Component {
  render() {
    const {name} = this.props.params;
    // XXX back link
    return <div>
      <h1>{name}</h1>
      <p>edit form here.</p>
    </div>;
  }
}
