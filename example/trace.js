const Profiler = require("../src/index");

const prof = new Profiler("Simple prof", {
  writeFile: false,
  logs: true
});

module.exports = (function() {
  prof.step("Hi George!");

  setTimeout(() => {
    prof.step("George, Hi again!");

    setTimeout(() => {
      prof.step("Bye George!");
    }, 1500);
  }, 500);
})();
