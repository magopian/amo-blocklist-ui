import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import EditForm from "../components/EditForm";
import * as CollectionActions from "../actions/collection";
import * as FormActions from "../actions/form";

function mapStateToProps(state) {
  return {
    name: state.collection.name,
    schema: state.collection.schema,
    form: state.form,
  };
}

function mapDispatchToProps(dispatch) {
  const combinedActions = Object.assign({}, CollectionActions, FormActions);
  return bindActionCreators(combinedActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm);

