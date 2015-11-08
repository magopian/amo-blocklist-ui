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

class TextField extends React.Component {
  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <Field label={this.props.label}>
        <input type="text"
          value={this.props.formData}
          placeholder={this.props.placeholder}
          onChange={this.onChange.bind(this)} />
      </Field>
    );
  }
}

class SelectField extends React.Component {
  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <Field label={this.props.label}>
        <select onChange={this.onChange.bind(this)}>{
          this.props.options.map((option, i) => {
            let attrs = {};
            if (option === this.props.formData) {
              attrs.selected = "selected";
            }
            return <option key={i} {...attrs}>{option}</option>;
          })
        }</select>
      </Field>
    );
  }
}

class UnsupportedField extends React.Component {
  render() {
    // XXX render json as string so dev can inspect faulty subschema
    return <div className="unsupported-field">
      Unsupported field schema {JSON.stringify(this.props.schema)}.
    </div>;
  }
}

class SchemaField extends React.Component {
  static get fieldComponents() {
    return {
      string: StringField,
      array:  ArrayField,
      object: ObjectField,
    };
  }

  render() {
    const schemaType = this.props.schema.type;
    const FieldComponent = SchemaField.fieldComponents[schemaType] ||
      UnsupportedField;
    return <FieldComponent {...this.props} />;
  }
}

class StringField extends React.Component {
  render() {
    const schema = this.props.schema;
    if (Array.isArray(schema.enum)) {
      return <SelectField label={schema.description}
        formData={this.props.formData}
        options={schema.enum}
        onChange={this.props.onChange.bind(this)} />;
    }
    return <TextField label={schema.description}
             formData={this.props.formData}
             placeholder={schema.description}
             onChange={this.props.onChange.bind(this)} />;
  }
}

class ArrayField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: props.formData || []};
  }

  onAddClick(event) {
    event.preventDefault();
    this.setState({items: this.state.items.concat("")});
  }

  asyncSetState(state) {
    // ensure state is propagated to parent component when it's actually set
    this.setState(state, _ => this.props.onChange(this.state.items));
  }

  onChange(index, value) {
    this.asyncSetState({
      items: this.state.items.map((item, i) => {
        return index === i ? value : item;
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
    const schema = this.props.schema;
    return (
      <div className="form-row">
        <label>{schema.description}</label>
        <div>{
          this.state.items.map((item, index) => {
            return <div key={index}>
              <SchemaField schema={schema.items}
                formData={this.state.items[index]}
                onChange={this.onChange.bind(this, index)} />
              <button type="button"
                onClick={this.onDropClick.bind(this, index)}>-</button>
            </div>;
          })
        }</div>
        <button type="button" onClick={this.onAddClick.bind(this)}>+</button>
      </div>
    );
  }
}

class ObjectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.formData || {};
  }

  asyncSetState(state) {
    // ensure state is propagated to parent component when it's actually set
    this.setState(state, _ => this.props.onChange(this.state));
  }

  onChange(name, value) {
    this.asyncSetState({[name]: value});
  }

  render() {
    const schema = this.props.schema;
    return <fieldset>
    <legend>{schema.description}</legend>
    {
      Object.keys(schema.properties).map((name, index) => {
        return <SchemaField key={index}
          name={name}
          formData={this.state[name]}
          schema={schema.properties[name]}
          onChange={this.onChange.bind(this, name)} />;
      })
    }</fieldset>;
  }
}

export default class GenericForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.formData || {};
  }

  onChange(value) {
    this.setState(value, _ => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state);
    }
    console.log(JSON.stringify(this.state, null, 2));
  }

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit.bind(this)}>
        <SchemaField
          schema={this.props.schema}
          formData={this.props.formData}
          onChange={this.onChange.bind(this)} />
        <p><button>Submit</button></p>
      </form>
    );
  }
}
