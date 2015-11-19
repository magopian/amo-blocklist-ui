import React, { Component } from "react";


export default class CollectionListPage extends Component {
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
    const {name, busy, schema, records} = this.props.collection;
    return <div>
      <h1>{name}</h1>
      <p>busy: {busy.toString()}</p>
      <p>schema: {(!!schema).toString()}</p>
      <p>{records.toString()}</p>
    </div>;
  }
}
