const Profiler = require("../src/index");

// return the instance of "Simple prof";
const prof = new Profiler("Simple prof");

module.exports = (function() {
  prof.step("Hi Paul!");

  setTimeout(() => {
    prof.step("Paul, Hi again!");

    setTimeout(() => {
      prof.step("Bey Paul!");
      prof.end();
    }, 5500);
  }, 2000);
})();
