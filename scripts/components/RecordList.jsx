import React from "react";

class RecordEntry extends React.Component {
  render() {
    const record = this.props.record;
    return <tr>
      {
        this.props.displayFields.map((displayField, index) => {
          return <td key={index}>{record[displayField]}</td>;
        })
      }
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>;
  }
}

export default class RecordList extends React.Component {
  render() {
    return <table>
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
          return <RecordEntry key={index} record={record}
            schema={this.props.schema}
            displayFields={this.props.displayFields} />;
        })
      }</tbody>
    </table>;
  }
}
