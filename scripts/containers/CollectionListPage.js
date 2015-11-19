import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CollectionList from "../components/CollectionList";
import * as CollectionActions from "../actions/collection";

function mapStateToProps(state) {
  return {
    collection: state.collection
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CollectionActions, dispatch);
}

// function mergeProps(stateProps, dispatchProps, ownProps) {
//   // XXX bind load to load by the collection name from routeParams
//   return Object.assign({}, ownProps, stateProps, dispatchProps);
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // mergeProps
)(CollectionList);

