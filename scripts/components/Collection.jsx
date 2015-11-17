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

class Notification extends React.Component {
  onCloseClick(event) {
    event.preventDefault();
    this.props.close();
  }

  render() {
    return <div className={`notification notification-${this.props.type}`}>
      <a className="close" href="" onClick={this.onCloseClick.bind(this)}>✖</a>
      <h2>{this.props.title}</h2>
      <p>{this.props.message}</p>
    </div>;
  }
}

class NotificationArea extends React.Component {
  render() {
    const actions = this.props.actions;
    return <div className="notifications">
      {this.props.error ?
        <Notification
          type="error"
          title="Error"
          message={this.props.error.message}
          close={actions.clearError.bind(actions)} /> : null}
      {this.props.message ?
        <Notification
          title={"Info"}
          type="message"
          message={this.props.message}
          close={actions.clearMessage.bind(actions)} /> : null}
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
        <NotificationArea
          message={this.state.message}
          error={this.state.error}
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
