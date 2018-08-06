const Profiler = require("../src/index");

const prof = new Profiler("Simple prof");

module.exports = (function() {
  prof.step("Hi Paul!");
  console.log("Hi Paul!");

  setTimeout(() => {
    prof.step("Paul, Hi again!");
    console.log("Paul, Hi again!");

    setTimeout(() => {
      prof.step("Bey Paul!");
      prof.end();
    }, 5500);
  }, 2000);
})();
