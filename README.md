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

You can even create multiple profilers that run in parallel!

### options

| property  | Default         | Type    | Description                                                                                         |
| --------- | --------------- | ------- | --------------------------------------------------------------------------------------------------- |
| writeFile | false           | Boolean | write a file in the root directory of the project with the results                                  |
| logs      | false           | Boolean | log the results to the console                                                                      |
| dir       | './simpleTrace' | String  | change the path of the output file, if the path doesn't exist SimpleTrace will create the directory |

## API

### .step

Insert new step to the log list

### .end

End the profiling task and output to the console or/and file.

If writeFile is active SimpleTrace will save the file `SimpleTrace-<name>-<Date.now()>.txt` in the output directory.

## Example

    const SimpleTrace = require("simpletrace");

    const profiler = new SimpleTrace("Beatle Test", {
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
    })();

The output of the file:

    Beatle Test results:
    --------------------

    Hi John! - 0 ms
    John, Hi again! - 2 sec
    Bye John! - 5.501 sec
