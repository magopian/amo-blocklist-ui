import { COLLECTION_SYNCED } from "../actions/collections";

/**
 * For now this list is static but later on we'll add collections and their
 * config dynamically.
 */
const INITIAL_STATE = {
  addons: {
    name: "addons",
    synced: true,
    config: {
      displayFields: ["addonId"],
    },
  },
  certificates: {
    name: "certificates",
    synced: true,
    config: {
      displayFields: ["issuerName"],
    },
  },
  gfx: {
    name: "gfx",
    synced: true,
    config: {
      displayFields: ["os", "vendor", "feature"],
    },
  },
  plugins: {
    name: "plugins",
    synced: true,
    config: {
      displayFields: ["matchName", "matchFilename", "matchDescription"],
    },
  },
};

export default function collections(state = INITIAL_STATE, action) {
  switch(action.type) {
  case COLLECTION_SYNCED:
    // Update the synced status for the provided collection name
    const collectionState = {
      ...state[action.name],
      ...{synced: action.synced}
    };
    return {
      ...state,
      [action.name]: collectionState
    };
  default:
    return state;
  }
}
