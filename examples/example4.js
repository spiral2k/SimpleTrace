const SimpleTrace = require("../src/index");

const profiler = new SimpleTrace("Ringo Starr", {
  writeFile: true,
  logs: true,
  dir: "./customTrace" // will create 'customTrace' directory in the root folder for that profiler
});

module.exports = (function() {
  profiler.step("Hi Ringo!");

  setTimeout(() => {
    profiler.step("Ringo, Hi again!");

    setTimeout(() => {
      profiler.step("Bye Ringo!");
      profiler.end(() => console.log('callback at the end'));
    }, 3500);
  }, 2000);
}());
