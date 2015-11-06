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
  
  asyncSetState(state) {
    // ensure state is propagated to parent component when it's actually set
    this.setState(state, () => {
      this.props.updateFieldValue(this.props.name, this.state.items);
    });
  }

  onChange(index, event) {
    this.asyncSetState({
      items: this.state.items.map((item, i) => {
        return index === i ? event.target.value : item;
      })
    });
  }
  
  onDropClick(index, event) {
    event.preventDefault();
    this.asyncSetState({
      items: this.state.items.filter((_, i) => i !== index)
    });
  }

  render() {
    return (
      <div className="form-row">
        <label>{this.props.label}</label>
        <div>{
          this.state.items.map((item, i) => {
            return <div>
              <input
                key={i}
                type="text"
                value={item}
                onChange={this.onChange.bind(this, i)} />
              <button type="button" 
                      onClick={this.onDropClick.bind(this, i)}>-</button>
            </div>;
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

function renderField(name, index, desc, updateFieldValue) {
  if (desc.type === "string") {
    if (Array.isArray(desc.enum)) {
      return <SelectField
        key={index}
        label={desc.description}
        name={name}
        options={desc.enum}
        updateFieldValue={updateFieldValue} />;
    }
    return <TextField label={desc.description}
             key={index}
             placeholder={desc.description}
             name={name}
             updateFieldValue={updateFieldValue} />;
  }
  if (desc.type === "array") {
    if (desc.items.type === "string") {
      return <StringListField
        key={index}
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
          Object.keys(this.props.schema.properties).map((name, index) => {
            const constraints = this.props.schema.properties[name];
            return renderField(name, index, constraints, updateFieldValue);
          })
        }</div>
        <p>
          <button>Submit</button>
        </p>
      </form>
    );
  }
}
