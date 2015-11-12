import React, { PropTypes } from "react";
import RecordList from "./RecordList";

class Collection extends React.Component {
  static contextTypes = {
    events: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = this.props.store.getState();
  }

  componentDidMount() {
    this.init(this.props.name);
  }

  componentWillUnmount() {
    this.context.events.removeAllListeners(this.props.name + ":change");
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.name !== nextProps.name) {
      this.init(nextProps.name);
    }
  }

  init(name) {
    this.context.events.removeAllListeners(name + ":change");
    this.context.events.on(name + ":change", this.onChange.bind(this));
    this.context.events.emit(name + ":load");
  }

  onChange(state) {
    this.setState(state);
  }

  onAddClick() {
    this.context.events.emit(this.props.name + ":add");
  }

  onSyncClick() {
    this.context.events.emit(this.props.name + ":sync");
  }

  render() {
    return (
      <div>
        <h1>{this.props.label}</h1>
        {this.state.records.length === 0 ?
          <p>This collection is empty.</p> :
          <RecordList
            name={this.props.name}
            schema={this.props.schema}
            displayFields={this.props.displayFields}
            records={this.state.records}
            events={this.context.events} />}
        <p>
          <button type="button"
            onClick={this.onSyncClick.bind(this)}>Synchronize</button>
          <button type="button"
            onClick={this.onAddClick.bind(this)}>Add</button>
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
  static childContextTypes = {
    events: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {current: props.defaultCollection};
  }

  getChildContext() {
    return {
      events: this.props.events
    };
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
        displayFields={collection.displayFields} />;
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
