import React from "react";
import "./styles.css";

class Field extends React.Component {
  render() {
    return (
      <div className="form-row">
        <label>
          {this.props.label ? this.props.label : null}
          {this.props.children}
        </label>
      </div>
    );
  }
}

class StringListField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  onAddClick(event) {
    event.preventDefault();
    this.setState({items: this.state.items.concat("")});
  }

  onChange(index, event) {
    const items = this.state.items.map((item, i) => {
      if (index === i) {
        return event.target.value;
      }
      return item;
    });
    this.setState({items: items}, () => {
      this.props.updateFieldValue(this.props.name, this.state.items);
    });
  }

  render() {
    return (
      <div className="form-row">
        <label>{this.props.label}</label>
        <div>{
          this.state.items.map((item, i) => {
            return <input
              key={i}
              type="text"
              value={item}
              onChange={this.onChange.bind(this, i)} />;
          })
        }</div>
        <button type="button" onClick={this.onAddClick.bind(this)}>+</button>
      </div>
    );
  }
}

class SelectField extends React.Component {
  onChange(event) {
    this.props.updateFieldValue(this.props.name, event.target.value);
  }

  render() {
    return (
      <Field label={this.props.label}>
        <select onChange={this.onChange.bind(this)}>{
          this.props.options.map((comp, i) => {
            return <option key={i}>{comp}</option>;
          })
        }</select>
      </Field>
    );
  }
}

class TextField extends React.Component {
  onChange(event) {
    this.props.updateFieldValue(this.props.name, event.target.value);
  }

  render() {
    return (
      <Field label={this.props.label}>
        <input
          type="text"
          name={this.props.name}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.onChange.bind(this)} />
      </Field>
    );
  }
}

function renderField(name, desc, updateFieldValue) {
  if (desc.type === "string") {
    if (Array.isArray(desc.enum)) {
      return <SelectField
        label={desc.description}
        name={name}
        options={desc.enum}
        updateFieldValue={updateFieldValue} />;
    }
    return <TextField label={desc.description}
             placeholder={desc.description}
             name={name}
             updateFieldValue={updateFieldValue} />;
  }
  if (desc.type === "array") {
    if (desc.items.type === "string") {
      return <StringListField
        label={desc.description}
        name={name}
        updateFieldValue={updateFieldValue} />;
    }
  }
  return null;
}

export default class GenericForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateFieldValue(name, value) {
    this.setState({[name]: value});
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    const updateFieldValue = this.updateFieldValue.bind(this);
    return (
      <form className="form" onSubmit={this.onSubmit.bind(this)}>
        <div>{
          Object.keys(this.props.schema.properties).map(name => {
            const constraints = this.props.schema.properties[name];
            return renderField(name, constraints, updateFieldValue);
          })
        }</div>
        <p>
          <button>Submit</button>
        </p>
      </form>
    );
  }
}
