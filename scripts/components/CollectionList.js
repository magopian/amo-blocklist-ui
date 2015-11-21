import React, { Component } from "react";
import LinkButton from "./LinkButton";

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

class Row extends Component {
  static get defaultProps() {
    return {
      schema: {},
      displayFields: [],
      record: {},
    };
  }

  get lastModified() {
    const lastModified = this.props.record.last_modified;
    if (!lastModified) {
      return null;
    }
    return new Date(lastModified).toJSON();
  }

  onDeleteClick(event) {
    if (confirm("Are you sure?")) {
      this.props.deleteRecord(this.props.record.id);
    }
  }

  render() {
    const { name, record, config } = this.props;
    return <tr className={record._status !== "synced" ? "unsynced" : ""}>
      {
        config.displayFields.map((displayField, index) => {
          return <td key={index}>{record[displayField]}</td>;
        })
      }
      <td className="lastmod">{this.lastModified}</td>
      <td className="status">{record._status}</td>
      <td className="actions">
        <LinkButton label="Edit"
          to={`/collections/${name}/edit/${record.id}`} />
        <button type="button"
          onClick={this.onDeleteClick.bind(this)}>Delete</button>
      </td>
    </tr>;
  }
}

class Table extends Component {
  render() {
    const {name, records, schema, config, deleteRecord} = this.props;
    if (records.length === 0) {
      return <p>This collection is empty.</p>;
    }
    return (
      <table className="record-list">
        <thead>
          <tr>
            {
              config.displayFields.map((field, index) => {
                return <th key={index}>{
                  schema.properties[field].title
                }</th>;
              })
            }
            <th>Last mod.</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{
          records.map((record, index) => {
            return <Row key={index}
              name={name}
              record={record}
              schema={schema}
              config={config}
              deleteRecord={deleteRecord} />;
          })
        }</tbody>
      </table>
    );
  }
}

export default class CollectionList extends Component {
  componentDidMount() {
    this.initialize(this.props.params.name);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.name !== nextProps.params.name) {
      this.initialize(nextProps.params.name);
    }
  }

  initialize(collectionName) {
    this.props.clearNotifications();
    this.props.select(collectionName);
    this.props.load();
  }

  onSyncClick() {
    this.props.sync();
  }

  onResetSyncClick() {
    if (confirm("Are you sure?")) {
      this.props.resetSync();
    }
  }

  render() {
    const {name, schema, records, config} = this.props.collection;
    const {deleteRecord} = this.props;
    if (!name) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h1>{name}</h1>
        <Table
          name={name}
          records={records}
          schema={schema}
          config={config}
          deleteRecord={deleteRecord} />
        <p className="actions">
          <button type="button"
            onClick={this.onSyncClick.bind(this)}>Synchronize</button>
          <LinkButton label="Add" to={`/collections/${name}/add`} />
          <AdvancedActions resetSync={this.onResetSyncClick.bind(this)} />
        </p>
      </div>
    );
  }
}
