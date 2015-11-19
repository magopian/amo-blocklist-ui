import React, { Component } from "react";

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

  onEditClick(event) {
    //this.props.actions.edit(this.props.record);
  }

  onDeleteClick(event) {
    if (confirm("Are you sure?")) {
      //this.props.actions.delete(this.props.record.id);
    }
  }

  render() {
    const { record } = this.props;
    return <tr className={record._status !== "synced" ? "unsynced" : ""}>
      {
        this.props.displayFields.map((displayField, index) => {
          return <td key={index}>{record[displayField]}</td>;
        })
      }
      <td className="lastmod">{this.lastModified}</td>
      <td className="status">{record._status}</td>
      <td className="actions">
        <button type="button"
          onClick={this.onEditClick.bind(this)}>Edit</button>
        <button type="button"
          onClick={this.onDeleteClick.bind(this)}>Delete</button>
      </td>
    </tr>;
  }
}

class Table extends Component {
  render() {
    const {records, schema, displayFields} = this.props;
    if (records.length === 0) {
      return <p>This collection is empty.</p>;
    }
    return (
      <table className="record-list">
        <thead>
          <tr>
            {
              displayFields.map((field, index) => {
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
              displayFields={displayFields} />;
          })
        }</tbody>
      </table>
    );
  }
}

export default class CollectionList extends Component {
  componentDidMount() {
    this.initialize(this.props.routeParams.name);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams.name !== nextProps.routeParams.name) {
      this.initialize(nextProps.routeParams.name);
    }
  }

  initialize(collectionName) {
    this.props.select(collectionName);
    this.props.load();
  }

  render() {
    const {name, schema, records} = this.props.collection;
    if (!name) {
      return <p>Loading...</p>;
    }
    const displayFields = this.props.collections[name].displayFields;
    return (
      <div>
        <h1>{name}</h1>
        <Table
          records={records}
          schema={schema}
          displayFields={displayFields} />
      </div>
    );
  }
}
