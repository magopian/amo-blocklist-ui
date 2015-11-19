/**
 * For now this list is static but later on we'll add collections
 * dynamically.
 */

const INITIAL_STATE = {
  addons: {
    name: "addons",
    displayFields: ["addonId"]
  },
  certificates: {
    name: "certificates",
    displayFields: ["issuerName"]
  },
  gfx: {
    name: "gfx",
    displayFields: ["os", "vendor", "feature"],
  },
  plugins: {
    name: "plugins",
    displayFields: ["matchName", "matchFilename", "matchDescription"],
  },
};

export default function collections(state = INITIAL_STATE, action) {
  return state;
}
