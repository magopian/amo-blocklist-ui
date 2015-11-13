import React from "react";

class RecordEntry extends React.Component {
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
    this.props.events.emit(this.props.name + ":edit", this.props.record);
  }

  onDeleteClick(event) {
    this.props.events.emit(this.props.name + ":delete", this.props.record.id);
  }


  render() {
    const record = this.props.record;
    return <tr>
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

export default class RecordList extends React.Component {
  static get defaultProps() {
    return {
      schema: {},
      displayFields: [],
      records: [],
    };
  }

  render() {
    return <table className="record-list">
      <thead>
        <tr>
          {
            this.props.displayFields.map((field, index) => {
              return <th key={index}>{
                this.props.schema.properties[field].title
              }</th>;
            })
          }
          <th>Last mod.</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{
        this.props.records.map((record, index) => {
          return <RecordEntry key={index}
            name={this.props.name}
            record={record}
            schema={this.props.schema}
            displayFields={this.props.displayFields}
            events={this.props.events} />;
        })
      }</tbody>
    </table>;
  }
}
