import { versionRangeSchema } from "./versionRange";

export const pluginSchema = {
  "title": "Plugin",
  "description": "A blocked plugin entry.",
  "type": "object",
  "additionalProperties": false,
  "required": ["versionRange"],
  "properties": {
    "matchName": {
      "type": "string",
      "title": "Name matches",
      "description": "A plugin name pattern to match."
    },
    "matchFilename": {
      "type": "string",
      "title": "Filename matches",
      "description": "A plugin filename pattern to match."
    },
    "matchDescription": {
      "type": "string",
      "title": "Description matches",
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
