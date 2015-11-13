import React from "react";
import RecordList from "./RecordList";

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
