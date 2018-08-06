const Profiler = require("../src/index");

const prof = new Profiler("Simple prof", {
  writeFile: true,
  logs: false
});

module.exports = (function() {
  prof.step("Hi George!");
  console.log("Hi George!");

  setTimeout(() => {
    prof.step("George, Hi again!");
    console.log("George, Hi again!");

    setTimeout(() => {
      prof.step("Bey George!");
    }, 1500);
  }, 500);
})();
