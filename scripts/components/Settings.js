import React, { Component } from "react";
import GenericForm from "./GenericForm";

export default class Settings extends Component {
  render() {
    const schema = {
      type: "object",
      title: "Settings",
      properties: {
        server: {
          title: "Server",
          type: "string",
          default: "http://127.0.0.1:8000/v1"
        },
        username: {
          title: "Username",
          type: "string",
          default: "user",
        },
        password: {
          title: "Password",
          type: "string",
          default: "",
        },
        bucket: {
          title: "Bucket",
          type: "string",
          default: "default"
        }
      }
    };
    return (
      <div>
        <h1>Settings</h1>
        <GenericForm
          schema={schema} />
      </div>
    );
  }
}
