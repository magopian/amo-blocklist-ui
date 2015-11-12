import React from "react";
import GenericForm from "./GenericForm";
import schemas from "../../schemas";

export default class CertificateForm extends React.Component {
  render() {
    return <GenericForm
      schema={schemas.certificates}
      formData={this.props.formData}
      onChange={this.setState.bind(this)}
      onSubmit={console.log.bind(console)} />;
  }
}
