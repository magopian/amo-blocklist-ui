export const pluginSchema = {
  "title": "Plugin",
  "type": "object",
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
    "versionRange": {
      "type": "array",
      "title": "Versions",
      "description": "The impacted versions",
      "items": {
        "type": "object",
        "title": "Version range",
        "description": "The version range.",
        "properties": {
          "minVersion": {
            "type": "string",
            "title": "Min version",
            "description": "The minimum version."
          },
          "maxVersion": {
            "type": "string",
            "title": "Max version",
            "description": "The maximum version."
          },
          "severity": {
            "type": "string",
            "title": "Severity",
            "description": "The severity code number.",
            "enum": ["", "0", "1", "2", "3"]
          },
          "vulnerabilitystatus": {
            "type": "string",
            "title": "Vulnerability status",
            "description": "The vulnerability status code number.",
            "enum": ["", "1", "2"]
          },
          "targetApplication": {
            "type": "object",
            "title": "Target application",
            "description": "The target application.",
            "properties": {
              "id": {
                "type": "string",
                "title": "Application id",
                "description": "The application unique identifier."
              },
              "minVersion": {
                "type": "string",
                "title": "Min version",
                "description": "The minimum version."
              },
              "maxVersion": {
                "type": "string",
                "title": "Max version",
                "description": "The maximum version."
              },
            }
          }
        }
      }
    }
  }
};
