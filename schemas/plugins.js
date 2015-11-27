import versionRangeSchema from "./versionRange";

export default {
  "title": "Plugin",
  "description": "A blocked plugin entry.",
  "type": "object",
  "additionalProperties": false,
  "required": ["versionRange"],
  "default": {
    "matchName": "",
    "matchFilename": "",
    "matchDescription": "",
    "infoURL": "",
    "versionRange": []
  },
  "properties": {
    "matchName": {
      "type": "string",
      "title": "Name match",
      "description": "A plugin name pattern to match."
    },
    "matchFilename": {
      "type": "string",
      "title": "Filename match",
      "description": "A plugin filename pattern to match."
    },
    "matchDescription": {
      "type": "string",
      "title": "Description match",
      "description": "A plugin description pattern to match."
    },
    "infoURL": {
      "type": "string",
      "title": "Info URL",
      "description": "A HTTP URL providing related information."
    },
    "versionRange": versionRangeSchema
  }
};
