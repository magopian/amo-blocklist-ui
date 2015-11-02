import React from "react";

export default class GfxForm extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form>
        <input type="text" name="os" placeholder="OS, eg. WINNT" />
      </form>
    );
  }
}
