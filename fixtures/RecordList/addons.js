import schemas from "../../schemas";

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
  schema: schemas.addons,
  displayFields: ["addonId"],
  records: fakeAddons(30)
};
