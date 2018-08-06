import { assert, expect } from "chai";
import Profiler from "../src";

describe("Simple crush test", () => {
  it("should not crush", () => {
    const prof = new Profiler("Crush prof", {
      writeFile: false,
      logs: false
    });

    prof.step("first step");
    prof.end();
    assert("test" === "test", "not crushed");
  });
});

describe("Args Validation", () => {
  it("should throw 'name should not be empty'", () => {
    expect(function() {
      var test1 = new Profiler("");
    }).to.throw(/SimpleTrace - name should not be empty/);
  });

  it("should throw 'name should be a string'", () => {
    expect(function() {
      var test2 = new Profiler(true);
    }).to.throw(/SimpleTrace - name should be a string/);
  });
});
