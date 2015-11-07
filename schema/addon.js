export const addonSchema = {
  "title": "Addon",
  "description": "Addon",
  "type": "object",
  "properties": {
    "addonId": {
      "type": "string",
      "description": "Addon id"
    },
    "prefs": {
      "type": "array",
      "description": "Preferences",
      "items": {
        "type": "string"
      }
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
