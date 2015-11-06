export const certificateSchema = {
  "title": "Certificate",
  "type": "object",
  "properties": {
    "issuerName": {
      "type": "string",
      "description": "Issuer name"
    },
    "serialNumber": {
      "type": "string",
      "description": "Serial number"
    }
  }
};
