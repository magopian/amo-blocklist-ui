import React, { Component} from "react";
import { Link } from "react-router";

export default class Sidebar extends Component {
  render() {
    const {collections, params} = this.props;
    return (
      <ul>
        <li className={params.name ? "" : "active"}>
          <Link to="/">Home</Link>
        </li>
        {
          Object.keys(collections).map((name, index) => {
            return <li key={index}
              className={params.name === name ? "active" : ""}>
              <Link to={`/collections/${name}`}>{name}</Link>
            </li>;
          })
        }
      </ul>
    );
  }
}
