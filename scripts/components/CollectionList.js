import React from "react";


export default class CollectionListPage extends React.Component {
  componentDidMount() {
    this.props.load(this.props.routeParams.name);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams.name !== nextProps.routeParams.name) {
      this.props.load(nextProps.routeParams.name);
    }
  }

  render() {
    return <div>
      <h1>{this.props.routeParams.name}</h1>
      <p>Yo.</p>
    </div>;
  }
}
