import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CollectionList from "../components/CollectionList";
import * as CollectionActions from "../actions/collection";
import * as NotificationsActions from "../actions/notifications";

function mapStateToProps(state) {
  return {
    collection: state.collection,
    collections: state.collections,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({}, CollectionActions, NotificationsActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionList);

