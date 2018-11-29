import { assert, expect, use } from "chai";
import sinon from 'sinon';
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
      profiler.step("1961");
      profiler.end();
    }).to.not.throw();
  });

  it("Should not throw when logs is true", () => {
    expect(function() {
      const profiler = new Profiler("Beatles", {
        logs: true
      });
      profiler.step("1962");
      profiler.end();
    }).to.not.throw();
  });

  it("Should not throw when logs & writeFile are true", () => {
    expect(function() {
      const profiler = new Profiler("Beatles", {
        writeFile: true,
        logs: true
      });
      profiler.step("1963");
      profiler.end();
    }).to.not.throw();
  });


  it("Should throw when no args at all", () => {
    expect(function() {
      const profiler = new Profiler("Beatles", {
        writeFile: true,
        logs: true
      });
      profiler.step("1963");
      profiler.end();
    }).to.throw();
  });

  it("Should call the callback at the end", () => {
    const cb = sinon.spy();
    const profiler = new Profiler("Beatles", {
      writeFile: true
    });
    profiler.step("Callback test");
    profiler.end(cb);
    setTimeout(() => assert(cb.calledOnce), 50)
  })
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
