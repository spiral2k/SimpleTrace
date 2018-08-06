# SimpleTrace

Simple profiling mechanism to find bottlenecks in your code.

### To begin

1.  install it


    npm i simpletrace -D

2.  Require it


    // ES6 modules
    import simpleTrace from "simpletrace'

    // CommonJS
    const simpleTrace = require("simpletrace")


### Usage

    const Profiler = new simpleTrace("Simple prof", {
      writeFile: true,
      logs: false
    });

### options

| property  | Default | Description                    |
| --------- | ------- | ------------------------------ |
| writeFile | false   | write a file with the results  |
| logs      | false   | log the results to the console |

## API

### .step

insert new step to the log list

### .end

End the profiling process end output to console or/and file.

## Example

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

the output of the file:

    Simple prof results:
    --------------------

    starting trace - 8 ms
    inside timeout - 2.012 sec
    inside second timeout - 5.517 sec

TODO:

- [ ] option change output file path
- [ ] singleton
