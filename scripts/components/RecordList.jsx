import React from "react";

class RecordEntry extends React.Component {
  static get defaultProps() {
    return {
      schema: {},
      displayFields: [],
      record: {},
    };
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
          <th>Actions</th>
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
