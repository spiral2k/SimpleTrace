import { assert } from "chai";
import Profiler from "../src";

const prof = new Profiler("Test prof", {
  writeFile: true,
  logs: true
});

describe("Simple crush test", () => {
  it("should not crush", () => {
    prof.step("first step");
    prof.end();
    assert("test" === "test", "not crushed");
  });
});
