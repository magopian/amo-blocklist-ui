import React, { Component} from "react";
import { Link } from "react-router";

export default class Sidebar extends Component {
  render() {
    const {collections, routeParams} = this.props;
    return (
      <ul>
        <li className={routeParams.name ? "" : "active"}>
          <Link to="/">Home</Link>
        </li>
        {
          Object.keys(collections).map((name, index) => {
            return <li key={index}
              className={routeParams.name === name ? "active" : ""}>
              <Link to={`/collections/${name}`}>{name}</Link>
            </li>;
          })
        }
      </ul>
    );
  }
}
