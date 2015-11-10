import React from "react";
import GenericForm from "./GenericForm";
import { addonSchema } from "../../schema/addon";

export default class AddonForm extends React.Component {
  render() {
    return <GenericForm
      schema={addonSchema}
      formData={this.props.formData}
      onChange={this.setState.bind(this)}
      onSubmit={console.log.bind(console)} />;
  }
}
