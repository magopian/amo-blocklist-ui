import React from "react";
import Collection from "./Collection";
import GenericForm from "./GenericForm";
import { cleanRecord } from "kinto/lib/api";

class HomePage extends React.Component {
  render() {
    return <div>
      <h1>AMO Blocklist</h1>
      <p>Welcome.</p>
    </div>;
  }
}

class Form extends React.Component {
  onSubmit(data) {
    if (this.props.action === "add") {
      this.props.actions.create(data.formData);
    } else if (this.props.action === "edit") {
      this.props.actions.update(this.props.original.id, data.formData);
    }
    this.props.actions.load();
  }

  onBackLinkClick(event) {
    event.preventDefault();
    this.props.actions.load();
  }

  render() {
    return <div>
      <h1>{this.props.label}</h1>
      <p>
        <a href="#" onClick={this.onBackLinkClick.bind(this)}>&laquo; Back</a>
      </p>
      <GenericForm {...this.props} onSubmit={this.onSubmit.bind(this)} />
    </div>;
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.defaultCollection,
      add: false,
      edit: null,
    };
    this.registerNavigationEvents();
  }

  static get defaultProps() {
    return {
      collections: {},
      defaultCollection: null,
    };
  }

  registerNavigationEvents() {
    Object.keys(this.props.collections).forEach(collection => {
      this.props.events.on([collection, "add"], _ => {
        this.setState({add: true, edit: null});
      });
      this.props.events.on([collection, "edit"], record => {
        this.setState({add: false, edit: record});
      });
      this.props.events.on([collection, "load"], record => {
        this.setState({add: false, edit: null});
      });
    });
  }

  select(current, event) {
    event.preventDefault();
    this.setState({add: false, edit: null, current});
  }

  renderContent() {
    if (this.state.current in this.props.collections) {
      const collection = this.props.collections[this.state.current];
      const formProps = {
        name: this.state.current,
        label: collection.label,
        schema: collection.schema,
        actions: collection.actions,
      };
      if (this.state.add) {
        return <Form action="add" {...formProps} />;
      } else if (this.state.edit) {
        const initialFormData = cleanRecord(this.state.edit,
            ["id", "last_modified", "_status"]);
        return <Form action="edit"
          original={this.state.edit}
          formData={initialFormData}
          {...formProps} />;
      }
      return this.renderCollection();
    }
    return <HomePage collections={this.props.collections} />;
  }

  renderCollection() {
    const collection = this.props.collections[this.state.current];
    return <Collection
      name={this.state.current}
      schema={collection.schema}
      store={collection.store}
      actions={collection.actions}
      label={collection.label}
      displayFields={collection.displayFields} />;
  }

  render() {
    return <div className="main">
      <div className="sidebar">
        <ul>
          <li className={!this.state.current ? "active" : ""}>
            <a href="#" onClick={this.select.bind(this, "home")}>Home</a>
          </li>
          {
            Object.keys(this.props.collections).map((name, index) => {
              const collection = this.props.collections[name];
              return <li key={index}
                className={this.state.current === name ? "active" : ""}>
                <a href="#" onClick={this.select.bind(this, name)}>
                  {collection.label}
                </a>
              </li>;
            })
          }
        </ul>
      </div>
      <div className="content">
        {this.renderContent()}
      </div>
    </div>;
  }
}
