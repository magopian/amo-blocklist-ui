import React from "react";
import RecordList from "./RecordList";

class AdvancedActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {enabled: false};
  }

  onAdvancedLinkClick(event) {
    event.preventDefault();
    this.setState({enabled: true});
  }

  render() {
    if (this.state.enabled) {
      return <button type="button"
        onClick={this.props.resetSync}>Reset Sync Status</button>;
    }
    return <a href="" onClick={this.onAdvancedLinkClick.bind(this)}>
      &raquo; Show advanced actions
    </a>;
  }
}

class ErrorNotification extends React.Component {
  onCloseClick(event) {
    event.preventDefault();
    this.props.actions.clearError();
  }

  render() {
    if (!this.props.error) {
      return null;
    }
    return <div className="error-notification">
      <a className="close" href="" onClick={this.onCloseClick.bind(this)}>✖</a>
      <h2>Error</h2>
      <p>{this.props.error.message}</p>
    </div>;
  }
}

export default class Collection extends React.Component {
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

  onResetSyncClick() {
    if (confirm("Are you sure?")) {
      this.props.actions.resetSync();
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.label}</h1>
        <ErrorNotification error={this.state.error}
          actions={this.props.actions} />
        {this.state.records.length === 0 ?
          <p>This collection is empty.</p> :
          <RecordList
            name={this.props.name}
            schema={this.props.schema}
            displayFields={this.props.displayFields}
            records={this.state.records}
            actions={this.props.actions} />}
        <p className="actions">
          <button type="button"
            onClick={this.onSyncClick.bind(this)}>Synchronize</button>
          <button type="button"
            onClick={this.onAddClick.bind(this)}>Add</button>
          <AdvancedActions resetSync={this.onResetSyncClick.bind(this)} />
        </p>
      </div>
    );
  }
}
