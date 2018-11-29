const SimpleTrace = require("../src/index");

// return the instance of "George and Paul";
const prof = new SimpleTrace("George and Paul");

module.exports = (function() {
  prof.step("Hi Paul!");

  setTimeout(() => {
    prof.step("Paul, Hi again!");

    setTimeout(() => {
      prof.step("Bye Paul!");
      prof.end();
    }, 5500);
  }, 2000);
}());
