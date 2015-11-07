import React from "react";
import GenericForm from "./GenericForm";
import { pluginSchema } from "../schema/plugin";

import "./styles.css";

export default class AppForm extends React.Component {
  render() {
    return <GenericForm schema={pluginSchema} />;
  }
}
