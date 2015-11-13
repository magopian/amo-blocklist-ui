import React from "react";
import RecordList from "./RecordList";

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.store.getState();
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.props.store.unsubscribe();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.name !== nextProps.name) {
      this.setState(nextProps.store.getState(), this.init);
    }
  }

  init() {
    this.props.store.unsubscribe();
    this.props.store.subscribe(this.onChange.bind(this));
    this.props.actions.load();
  }

  onChange(state) {
    this.setState(state);
  }

  onAddClick() {
    this.props.actions.add();
  }

  onSyncClick() {
    this.props.actions.sync();
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
            actions={this.props.actions} />}
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
        actions={collection.actions}
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
