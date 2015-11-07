import React from "react";
import GenericForm from "./GenericForm";
import { addonSchema } from "../schema/addon";

import "./styles.css";

export default class AddonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return <GenericForm 
      schema={addonSchema} 
      formData={this.props.formData}
      onChange={this.setState.bind(this)} />;
  }
}
