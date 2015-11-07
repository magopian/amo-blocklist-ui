export const gfxSchema = {
  "title": "Gfx",
  "description": "Graphic driver blocklist entry.",
  "type": "object",
  "properties": {
    "os": {
      "type": "string",
      "description": "OS"
    },
    "vendor": {
      "type": "string",
      "description": "Vendor"
    },
    "devices": {
      "type": "array",
      "description": "Devices",
      "items": {
        "type": "string"
      }
    },
    "feature": {
      "type": "string",
      "description": "Feature"
    },
    "featureStatus": {
      "type": "string",
      "description": "Feature status",
      "enum": [
        "",
        "BLOCKED_DRIVER_VERSION",
        "BLOCKED_DEVICE"
      ]
    },
    "driverVersion": {
      "type": "string",
      "description": "Driver version"
    },
    "driverVersionComparator": {
      "type": "string",
      "description": "Driver version comparator",
      "enum": [
        "EQUAL",
        "LESS_THAN",
        "LESS_THAN_OR_EQUAL",
        "GREATER_THAN",
        "GREATER_THAN_OR_EQUAL"
      ]
    }
  }
};
