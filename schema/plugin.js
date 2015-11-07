export const pluginSchema = {
  "title": "Plugin",
  "type": "object",
  "properties": {
    "matchName": {
      "type": "string",
      "description": "Name matches"
    },
    "matchFilename": {
      "type": "string",
      "description": "Filename matches"
    },
    "matchDescription": {
      "type": "string",
      "description": "Description matches"
    },
    "infoURL": {
      "type": "string",
      "description": "Info URL"
    },
    "versionRange": {
      "type": "array",
      "description": "Versions",
      "items": {
        "type": "object",
        "description": "Version range",
        "properties": {
          "minVersion": {
            "type": "string",
            "description": "Min version"
          },
          "maxVersion": {
            "type": "string",
            "description": "Max version"
          },
          "severity": {
            "type": "string",
            "description": "Severity",
            "enum": ["", "0", "1", "2", "3"]
          },
          "vulnerabilitystatus": {
            "type": "string",
            "description": "Vulnerability status",
            "enum": ["", "1", "2"]
          },
          "targetApplication": {
            "type": "object",
            "description": "Target application",
            "properties": {
              "id": {
                "type": "string",
                "description": "Application id"
              },
              "minVersion": {
                "type": "string",
                "description": "Min version"
              },
              "maxVersion": {
                "type": "string",
                "description": "Max version"
              },
            }
          }
        }
      }
    }
  }
};
