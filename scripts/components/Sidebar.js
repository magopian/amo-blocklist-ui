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
          collections.map((collection, index) => {
            return <li key={index}
              className={routeParams.name === collection ? "active" : ""}>
              <Link to={`/collections/${collection}`}>{collection}</Link>
            </li>;
          })
        }
      </ul>
    );
  }
}
