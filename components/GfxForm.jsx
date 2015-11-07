import React from "react";
import GenericForm from "./GenericForm";
import { gfxSchema } from "../schema/gfx";

import "./styles.css";

export default class GfxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return <GenericForm 
      schema={gfxSchema} 
      formData={this.props.formData}
      onChange={this.setState.bind(this)} />;
  }
}
