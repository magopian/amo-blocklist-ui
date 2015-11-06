export const addonSchema = {
  "title": "Addon",
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
      "description": "Version range",
      "items": {
        "type": "object",
        "properties": {
          
        }
      }
    }
  }
};
