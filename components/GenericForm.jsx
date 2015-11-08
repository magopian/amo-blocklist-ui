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
          value={this.props.formData || this.props.defaults}
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
        <select value={this.props.formData || this.props.defaults}
          onChange={this.onChange.bind(this)}>{
          this.props.options.map((option, i) => {
            return <option key={i}>{option}</option>;
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
      return <SelectField label={schema.title}
        formData={this.props.formData}
        defaults={this.props.defaults}
        options={schema.enum}
        onChange={this.props.onChange.bind(this)} />;
    }
    return <TextField label={schema.title}
             formData={this.props.formData}
             defaults={this.props.defaults}
             placeholder={schema.description}
             onChange={this.props.onChange.bind(this)} />;
  }
}

class ArrayField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: props.formData || props.defaults || []};
  }

  get itemTitle() {
    const schema = this.props.schema;
    return schema.items.title || schema.items.description || "Item";
  }

  getItemDefaults(index) {
    if (Array.isArray(this.props.defaults)) {
      return this.props.defaults[index];
    }
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
      <fieldset className="form-row">
        <legend>{schema.title}</legend>
        {schema.description ? <div>{schema.description}</div> : null}
        <div className="array-item-list">{
          this.state.items.map((item, index) => {
            return <fieldset className="array-item" key={index}>
              <legend>{this.itemTitle}</legend>
              <SchemaField schema={schema.items}
                formData={this.state.items[index]}
                defaults={this.getItemDefaults(index)}
                onChange={this.onChange.bind(this, index)} />
              <button className="array-item-remove" type="button"
                onClick={this.onDropClick.bind(this, index)}>-</button>
            </fieldset>;
          })
        }</div>
        <button type="button" className="array-item-add"
          onClick={this.onAddClick.bind(this)}>+</button>
      </fieldset>
    );
  }
}

class ObjectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.formData || props.defaults || {};
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
    return <div>{
      Object.keys(schema.properties).map((name, index) => {
        return <SchemaField key={index}
          name={name}
          schema={schema.properties[name]}
          formData={this.state[name]}
          defaults={this.props.defaults ? this.props.defaults[name] : undefined}
          onChange={this.onChange.bind(this, name)} />;
      })
    }</div>;
  }
}

export default class GenericForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.formData || props.defaults || {};
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
      <form className="generic-form" onSubmit={this.onSubmit.bind(this)}>
        <SchemaField
          schema={this.props.schema}
          formData={this.props.formData}
          defaults={this.props.defaults}
          onChange={this.onChange.bind(this)} />
        <p><button>Submit</button></p>
      </form>
    );
  }
}
