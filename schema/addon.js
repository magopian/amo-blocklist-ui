export const addonSchema = {
  "title": "Addon",
  "description": "Addon",
  "type": "object",
  "properties": {
    "addonId": {
      "type": "string",
      "title": "Addon id",
      "description": "The addon unique identifier."
    },
    "prefs": {
      "type": "array",
      "title": "Preferences",
      "description": "The list of impacted preferences.",
      "items": {
        "title": "Preference",
        "description": "The browser preference name, eg. browser.startup.homepage",
        "type": "string"
      }
    },
    "versionRange": {
      "type": "array",
      "title": "Versions",
      "description": "The list of impacted versions.",
      "items": {
        "type": "object",
        "title": "Version range",
        "description": "Version range",
        "properties": {
          "minVersion": {
            "type": "string",
            "title": "Min version",
            "description": "The mininum version."
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
            "description": "The target application information.",
            "properties": {
              "id": {
                "type": "string",
                "title": "Application id",
                "description": "The application unique identifier."
              },
              "minVersion": {
                "type": "string",
                "title": "Min version",
                "description": "The mininum version."
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
