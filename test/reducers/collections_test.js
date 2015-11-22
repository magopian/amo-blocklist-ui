import { expect } from "chai";
import collections from "../../scripts/reducers/collections";

describe("collections reducer", () => {
  it("should have static state defined", () => {
    expect(collections(undefined, {type: null}))
      .to.include.keys(["addons", "certificates", "gfx", "plugins"]);
  });
});
