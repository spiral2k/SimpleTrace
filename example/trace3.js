const Profiler = require("../src/index");

const prof = new Profiler("Simple prof 2", {
  writeFile: false,
  logs: true
});

module.exports = (function() {
  prof.step("Hi John!");

  setTimeout(() => {
    prof.step("Joahn, Hi again!");

    setTimeout(() => {
      prof.step("Bey John!");
      prof.end();
    }, 3500);
  }, 2000);
})();
