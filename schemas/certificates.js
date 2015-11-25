export default {
  "title": "Certificate",
  "description": "A blocked certificate entry.",
  "type": "object",
  "additionalProperties": false,
  "required": ["issuerName", "serialNumber"],
  "default": {
    "enabled": false,
    "issuerName": "",
    "serialNumber": ""
  },
  "properties": {
    "enabled": {
      "type": "boolean",
      "title": "Enabled",
      "description": "Blocking rule is enabled.",
      "default": false
    },
    "issuerName": {
      "type": "string",
      "title": "Issuer name",
      "description": "The certificate issuer name."
    },
    "serialNumber": {
      "type": "string",
      "title": "Serial number",
      "description": "The certificate serial number."
    }
  }
};
