import React from "react";
import RecordList from "./RecordList";

import { addonSchema } from "../../schema/addon";

class AddonSection extends React.Component {
  render() {
    return (
      <div>
        <h1>Blocked addons</h1>
        <RecordList schema={addonSchema} displayFields={["addonId"]}
          records={[]} />
      </div>
    );
  }
}

class Section extends React.Component {
  render() {
    switch(this.props.current) {
    case "addons": return <AddonSection />;
    case "certificates": return <div>Certificate section</div>;
    case "gfx": return <div>Gfx section</div>;
    case "plugins": return <div>Plugin section</div>;
    default: return <div>Home section</div>;
    }
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentSection: "home"};
  }

  static get sections() {
    return {
      addons: "Addons",
      certificates: "Certificates",
      gfx: "Gfx",
      plugins: "Plugins",
    };
  }

  navigate(currentSection, event) {
    event.preventDefault();
    this.setState({currentSection});
  }

  render() {
    return <div>
      <div className="sidebar">
        <ul>{
          Object.keys(App.sections).map((section, index) => {
            return <li key={index}>
              <a href="#" onClick={this.navigate.bind(this, section)}>
                {App.sections[section]}
              </a>
            </li>;
          })
        }</ul>
      </div>
      <div className="content">
        <Section current={this.state.currentSection} />
      </div>
    </div>;
  }
}
