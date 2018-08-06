const Profiler = require("../src/index");

const prof = new Profiler("Simple prof", {
  writeFile: true,
  logs: false
});

module.exports = (function() {
  prof.step("starting trace");
  console.log("Hi!");

  setTimeout(() => {
    prof.step("inside timeout");
    console.log("Hi again!");

    setTimeout(() => {
      prof.step("inside second timeout");
      prof.end();
    }, 3500);
  }, 2000);
})();
