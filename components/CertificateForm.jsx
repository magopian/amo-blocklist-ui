import React from "react";
import GenericForm from "./GenericForm";
import { certificateSchema } from "../schema/certificate";

import "./styles.css";

export default class CertificateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static get defaults() {
    return {
      issuerName: "",
      serialNumber: ""
    };
  }

  render() {
    return <GenericForm
      schema={certificateSchema}
      defaults={CertificateForm.defaults}
      formData={this.props.formData}
      onChange={this.setState.bind(this)}
      onSubmit={console.log.bind(console)} />;
  }
}
