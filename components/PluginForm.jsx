import React from "react";
import GenericForm from "./GenericForm";
import { pluginSchema } from "../schema/plugin";

import "./styles.css";

export default class PluginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <GenericForm
      schema={pluginSchema}
      formData={this.props.formData}
      onChange={this.setState.bind(this)} />;
  }
}
