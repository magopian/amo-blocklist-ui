import addons from "./addons";
import certificates from "./certificates";
import gfx from "./gfx";
import plugins from "./plugins";

/**
 * Warning: This is supposed to be removed in the long-term.
 *
 * Currently, the schemas are built here using JavaScript.
 * In the long-term, schemas will be fetched from Kinto collections
 * instead of being defined here.
 *
 * c.f. `reducers/collections.js`.
 */

function addEnabledField(schema) {
  return {
    ...schema,
    default: {
      enabled: false,
      ...schema.default
    },
    properties: {
      enabled: {
        type: "boolean",
        title: "Enabled",
        description: "Blocking rule is enabled.",
        default: false
      },
      ...schema.properties
    }
  }
}

export default {
  addons: addEnabledField(addons),
  certificates: addEnabledField(certificates),
  gfx: addEnabledField(gfx),
  plugins: addEnabledField(plugins),
};
