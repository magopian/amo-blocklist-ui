import React from "react";
import GenericForm from "./GenericForm";
import { certificateSchema } from "../../schema/certificate";

export default class CertificateForm extends React.Component {
  render() {
    return <GenericForm
      schema={certificateSchema}
      formData={this.props.formData}
      onChange={this.setState.bind(this)}
      onSubmit={console.log.bind(console)} />;
  }
}
