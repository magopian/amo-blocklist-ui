import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CollectionList from "../components/CollectionList";
import * as CollectionActions from "../actions/collection";

function mapStateToProps(state) {
  return {
    collection: state.collection,
    collections: state.collections,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CollectionActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionList);

