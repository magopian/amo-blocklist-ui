import React from "react";
import RecordList from "./RecordList";

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.store.getState();
  }

  componentDidMount() {
    this.init(this.props.name);
  }

  componentWillUnmount() {
    this.props.events.removeAllListeners(this.props.name + ":change");
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.name !== nextProps.name) {
      this.init(nextProps.name);
    }
  }

  init(name) {
    this.props.events.removeAllListeners(name + ":change");
    this.props.events.on(name + ":change", this.onChange.bind(this));
    this.props.events.emit(name + ":load");
  }

  onChange(state) {
    this.setState(state);
  }

  sync() {
    this.props.events.emit(this.props.name + ":sync");
  }

  render() {
    return (
      <div>
        <h1>{this.props.label}</h1>
        {this.state.records.length === 0 ?
          <p>This collection is empty.</p> :
          <RecordList schema={this.props.schema}
            displayFields={this.props.displayFields}
            records={this.state.records} />}
        <p>
          <button onClick={this.sync.bind(this)}>Synchronize</button>
        </p>
      </div>
    );
  }
}

class HomePage extends React.Component {
  render() {
    return <div>
      <h1>AMO Blocklist</h1>
      <p>Welcome.</p>
    </div>;
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {current: props.defaultCollection};
  }

  static get defaultProps() {
    return {
      collections: {},
      defaultCollection: null,
    };
  }

  select(current, event) {
    event.preventDefault();
    this.setState({current});
  }

  renderCollection() {
    if (this.state.current in this.props.collections) {
      const collection = this.props.collections[this.state.current];
      return <Collection
        name={this.state.current}
        schema={collection.schema}
        store={collection.store}
        label={collection.label}
        displayFields={collection.displayFields}
        events={this.props.events} />;
    }
    return <HomePage collections={this.props.collections} />;
  }

  render() {
    return <div className="main">
      <div className="sidebar">
        <ul>
          <li className={!this.state.current ? "active" : ""}>
            <a href="#" onClick={this.select.bind(this, "home")}>Home</a>
          </li>
          {
            Object.keys(this.props.collections).map((name, index) => {
              const collection = this.props.collections[name];
              return <li key={index}
                className={this.state.current === name ? "active" : ""}>
                <a href="#" onClick={this.select.bind(this, name)}>
                  {collection.label}
                </a>
              </li>;
            })
          }
        </ul>
      </div>
      <div className="content">
        {this.renderCollection()}
      </div>
    </div>;
  }
}
