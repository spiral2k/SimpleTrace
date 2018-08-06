import { assert, expect } from "chai";
import Profiler from "../src";

describe("Simple QA test", () => {
  it("Should not throw when not passing options object", () => {
    expect(function() {
      const profiler = new Profiler("Beatles");
      profiler.step("1960");
      profiler.end();
    }).to.not.throw();
  });

  it("Should not throw when writeFile is true", () => {
    expect(function() {
      const profiler = new Profiler("Beatles", {
        writeFile: true
      });
      profiler.step("1960");
      profiler.end();
    }).to.not.throw();
  });

  it("Should not throw when logs is true", () => {
    expect(function() {
      const profiler = new Profiler("Beatles", {
        logs: true
      });
      profiler.step("1960");
      profiler.end();
    }).to.not.throw();
  });

  it("Should not throw when logs & writeFile are true", () => {
    expect(function() {
      const profiler = new Profiler("Beatles", {
        writeFile: true,
        logs: true
      });
      profiler.step("1960");
      profiler.end();
    }).to.not.throw();
  });
});

describe("Args Validation", () => {
  it("should throw 'name should not be empty'", () => {
    expect(function() {
      const profiler = new Profiler("");
    }).to.throw(/SimpleTrace - name should not be empty/);
  });

  it("should throw 'name should be a string'", () => {
    expect(function() {
      const profiler = new Profiler(true);
    }).to.throw(/SimpleTrace - name should be a string/);
  });
});
