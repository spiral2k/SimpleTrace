const SimpleTrace = require("../src/index");

const prof = new SimpleTrace("George and Paul", {
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
}());
