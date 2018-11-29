const SimpleTrace = require("../src/index");

const profiler = new SimpleTrace("John Lennon", {
  writeFile: true,
  logs: true
});

module.exports = (function() {
  profiler.step("Hi John!");

  setTimeout(() => {
    profiler.step("John, Hi again!");

    setTimeout(() => {
      profiler.step("Bye John!");
      profiler.end();
    }, 3500);
  }, 2000);
}());
