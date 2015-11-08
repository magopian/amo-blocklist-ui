import React from "react";
import GenericForm from "./GenericForm";
import { gfxSchema } from "../schema/gfx";

import "./styles.css";

export default class GfxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static get defaults() {
    return {
      os: "",
      vendor: "",
      devices: [],
      feature: "",
      featureStatus: "",
      driverVersion: "",
      driverVersionComparator: ""
    };
  }

  render() {
    return <GenericForm
      schema={gfxSchema}
      defaults={GfxForm.defaults}
      formData={this.props.formData}
      onChange={this.setState.bind(this)} />;
  }
}
