/**
 * For now this list is static but later on we'll add collections and their
 * config dynamically.
 */

const INITIAL_STATE = {
  addons: {
    name: "addons",
    config: {
      displayFields: ["addonId"],
    },
  },
  certificates: {
    name: "certificates",
    config: {
      displayFields: ["issuerName"],
    },
  },
  gfx: {
    name: "gfx",
    config: {
      displayFields: ["os", "vendor", "feature"],
    },
  },
  plugins: {
    name: "plugins",
    config: {
      displayFields: ["matchName", "matchFilename", "matchDescription"],
    },
  },
};

export default function collections(state = INITIAL_STATE, action) {
  return state;
}
