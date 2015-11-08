import React from "react";
import GenericForm from "./GenericForm";
import { certificateSchema } from "../schema/certificate";

import "./styles.css";

export default class CertificateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <GenericForm
      schema={certificateSchema}
      formData={this.props.formData}
      onChange={this.setState.bind(this)} />;
  }
}
