import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AddForm from "../components/AddForm";
import * as CollectionActions from "../actions/collection";

function mapStateToProps(state) {
  return {
    name: state.collection.name,
    schema: state.collection.schema,
    form: state.form,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CollectionActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddForm);

