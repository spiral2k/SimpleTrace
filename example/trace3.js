const Profiler = require("../src/index");

const prof = new Profiler("Simple prof 2", {
  writeFile: true,
  logs: false
});

module.exports = (function() {
  prof.step("Hi John!");
  console.log("Hi John!");

  setTimeout(() => {
    prof.step("Joahn, Hi again!");
    console.log("Joahn, Hi again!");

    setTimeout(() => {
      prof.step("Bey John!");
      prof.end();
    }, 3500);
  }, 2000);
})();
