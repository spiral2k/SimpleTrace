# SimpleTrace

Simple but powerful profiling mechanism to find bottlenecks in your code.

### To begin

Install it

    npm i simpletrace -D

Require it

    // ES6 modules
    import SimpleTrace from "simpletrace';

    // CommonJS
    const SimpleTrace = require("simpletrace");

### Usage

    const Profiler = new SimpleTrace("Simple prof", {
      writeFile: true,
      logs: false
    });

#### debug across multiple files
If you want to debug across multiple files with the same profiler, just ask SimpleTrace for the instance:

    const prof = new SimpleTrace("Simple prof");

If you debug across multiple files with the same profiler and you're not sure which file will run first, pass the options object to each constructor `(new SimpleTrace)`


You can create multiple profilers that run in parallel!

### TODO:
- [X] Singleton
- [ ] Option change output file path


### options

| property  | Default | Description                    |
| --------- | ------- | ------------------------------ |
| writeFile | false   | write a file in the root directory of the project with the results   |
| logs      | false   | log the results to the console |

## API

### .step

Insert new step to the log list

### .end

End the profiling task and output to the console or/and file.

If writeFile is active SimpleTrace will save the file `SimpleTrace-<name>-<Date.now()>.txt` in the root directory of the project.

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

The output of the file:

    Simple prof results:
    --------------------

    starting trace - 8 ms
    inside timeout - 2.012 sec
    inside second timeout - 5.517 sec

