import { addonSchema } from "../../schema/addon";

function fakeAddon(index) {
  return {
    addonId: "addon_" + index
  };
}

function fakeAddons(n) {
  var records = [];
  for (let i=0; i<n; i++) {
    records.push(fakeAddon(i));
  }
  return records;
}

module.exports = {
  schema: addonSchema,
  displayFields: ["addonId"],
  records: fakeAddons(30)
};
