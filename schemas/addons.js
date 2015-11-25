import versionRangeSchema from "./versionRange";

export default {
  "title": "Addon",
  "description": "Addon",
  "type": "object",
  "additionalProperties": false,
  "required": ["addonId"],
  "default": {
    "enabled": false,
    "addonId": "",
    "prefs": [],
    "versionRange": []
  },
  "properties": {
    "enabled": {
      "type": "boolean",
      "title": "Enabled",
      "description": "Blocking rule is enabled.",
      "default": false
    },
    "addonId": {
      "type": "string",
      "title": "Addon id",
      "description": "The addon unique identifier.",
      "minLength": 1,
      "default": ""
    },
    "prefs": {
      "type": "array",
      "title": "Preferences",
      "description": "The list of impacted preferences.",
      "uniqueItems": true,
      "default": [],
      "items": {
        "title": "Preference name",
        "description": "The browser preference name, eg. browser.startup.homepage",
        "type": "string",
        "minLength": 1,
        "default": ""
      }
    },
    "versionRange": versionRangeSchema
  }
};
