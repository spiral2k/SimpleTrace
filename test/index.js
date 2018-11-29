import { assert, expect, use } from "chai";
import sinon from 'sinon';

import Profiler from "../src";

describe("Constructor test", () => {

  it("Should not throw when not passing options object", () => {
    expect(function() {new Profiler("Beatles test 1")}).to.not.throw();
  });

  it("Should not throw when writeFile is true", () => {
    expect(function() {new Profiler("Beatles test 2", {
        writeFile: true
      })}).to.not.throw();
  });

  it("Should not throw when logs is true", () => {
    expect(function() {new Profiler("Beatles test 3", {
        logs: true
      })}).to.not.throw();
  });

  it("Should not throw when logs & writeFile are true", () => {
    expect(function() {new Profiler("Beatles test 4", {
        writeFile: true,
        logs: true
      })}).to.not.throw();
  });
});

describe("Profiling test", function() {

  it("Should call the callback at the end", () => {
    const cb = sinon.spy();
    const profiler = new Profiler("Simple Beatle 1", { writeFile: true });
    profiler.step("Callback test");
    profiler.end(cb);
    setTimeout(() => assert(cb.calledOnce), 50)
  })

  it("full profiling with writeFile & dir should end successfully", function(done) {
    this.timeout(5000)
    const profiler = new Profiler("Simple Beatle 2", {
      writeFile: true,
      dir:  './Sgt. Peppers Lonely Hearts Club Band'
    });
    setTimeout(function() {
      profiler.step("Simple step");
      setTimeout(function() {
        profiler.end();
        done();
      }, 2500);
    },2000)
  })

  it("full profiling with logs should end successfully", function(done) {
    this.timeout(5000)
    const profiler = new Profiler("Simple Beatle 3", { logs: true });
    setTimeout(function() {
      profiler.step("Simple step");
      setTimeout(function() {
        profiler.end();
        done();
      }, 2500);
    },2000)
  })

  it("full profiling with logs should end successfully", function(done) {
    this.timeout(5000)
    const profiler = new Profiler("Simple Beatle 4", { 
      writeFile: true,
      dir:  './Sgt. Peppers Lonely Hearts Club Band',
      logs: true });

    setTimeout(function() {
      profiler.step("Simple step");
      setTimeout(function() {
        profiler.end();
        done();
      }, 2500);
    },2000)
  })
})

describe("Args Validation", () => {
  it("should throw when name empty string", () => {
    expect(function() { new Profiler("") }).to.throw(Error, "SimpleTrace: name should not be empty");
  });

  it("should throw when name not a string", () => {
    expect(function() { new Profiler(true) }).to.throw(Error, "SimpleTrace: name should be a string");
  });

  it("Should throw when no args at all", () => {
    const func = function() { new Profiler() }
    expect(func).to.throw(Error, 'SimpleTrace: name should not be empty');
  });

  it("Should throw when options not an object", () => {
    const func = function() { new Profiler("Beatle", null) }
    expect(func).to.throw(Error, 'SimpleTrace: options should be object');
  });
});
