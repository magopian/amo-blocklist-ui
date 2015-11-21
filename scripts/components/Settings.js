import React, { Component } from "react";
import GenericForm from "./GenericForm";

const settingsSchema = {
  type: "object",
  title: "Settings",
  required: ["server", "bucket"],
  properties: {
    server:   {title: "Server", type: "string"},
    bucket:   {title: "Bucket", type: "string"},
    username: {title: "Username", type: "string"},
    password: {title: "Password", type: "string"},
  }
};

export default class Settings extends Component {
  onSave(data) {
    this.props.saveSettings(data.formData);
  }

  render() {
    const { settings } = this.props;
    return (
      <div>
        <h1>Settings</h1>
        <GenericForm
          schema={settingsSchema}
          formData={Object.keys(settings).length ? settings : null}
          onSubmit={this.onSave.bind(this)} />
      </div>
    );
  }
}
