import React from "react";

class Section extends React.Component {
  render() {
    switch(this.props.current) {
    case "addon": return <div>Addon section</div>;
    case "certificate": return <div>Certificate section</div>;
    case "gfx": return <div>Gfx section</div>;
    case "plugin": return <div>Plugin section</div>;
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

  navigate(currentSection) {
    this.setState({currentSection});
  }

  render() {
    return <div>
      <div className="sidebar">
        <ul>{
          Object.keys(App.sections).map((section, index) => {
            return <li>
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
