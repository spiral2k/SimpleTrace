const SimpleTrace = require("../src/index");

const profiler = new SimpleTrace("Simple prof 3", {
  writeFile: true,
  dir: "./customTrace" // will create 'customTrace' directory in the root folder
});

module.exports = (function() {
  profiler.step("Hi Ringo!");

  setTimeout(() => {
    profiler.step("Ringo, Hi again!");

    setTimeout(() => {
      profiler.step("Bye Ringo!");
      profiler.end();
    }, 3500);
  }, 2000);
})();
