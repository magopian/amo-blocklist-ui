import React from "react";
import GenericForm from "./GenericForm";
import { certificateSchema } from "../schema/certificate";

import "./styles.css";

export default class AppForm extends React.Component {
  render() {
    return <GenericForm schema={certificateSchema} />;
  }
}
