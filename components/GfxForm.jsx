import React from "react";
import GenericForm from "./GenericForm";
import { gfxSchema } from "../schema/gfx";

import "./styles.css";

export default class AppForm extends React.Component {
  render() {
    return <GenericForm schema={gfxSchema} />;
  }
}
