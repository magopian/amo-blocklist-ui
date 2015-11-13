import schemas from "../../schemas";

module.exports = {
  state: {},
  schema: schemas.addons,
  formData: {
    "addonId": "/^pink@.*\\.info$/",
    "prefs": [
      "browser.startup.homepage",
      "browser.search.defaultenginename"
    ],
    "versionRange": [
      {
        "minVersion": "0",
        "maxVersion": "*",
        "severity": "1",
        "targetApplication": {
          "id": "{ec8030f7-c20a-464f-9b0e-13a3a9e97384}",
          "minVersion": "18.0",
          "maxVersion": "*"
        }
      }
    ]
  }
};
