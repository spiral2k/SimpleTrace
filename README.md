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

| Name  | Default         | Type    | Description                                                                                         |
| --------- | --------------- | ------- | --------------------------------------------------------------------------------------------------- |
| writeFile | false           | Boolean | write a file in the root directory of the project with the results                                  |
| logs      | false           | Boolean | log the results to the console                                                                      |
| dir       | './simpleTrace' | String  | change the directory of the output file, if the directory doesn't exist SimpleTrace will create it |

## API

### .step

Insert new step to the log list

### .end

End the profiling task and output to the console or/and file.

If writeFile is active SimpleTrace will save the file `SimpleTrace-<name>-<Date.now()>.txt` in the output directory.

## Example

    const SimpleTrace = require("simpletrace");

    const profiler = new SimpleTrace("Debug awesomeFunction", {
    writeFile: true,
    logs: true
    });

    module.exports = (function awesomeFunction() {
      profiler.step("Starting awesomeFunction");

      profiler.step("Before getSomeAwesomeData");
      const data = getSomeAwesomeData();
      profiler.step("After getSomeAwesomeData");
 
      profiler.step("Before dataHashing");
      const hashing = dataHashing(data); // <-- This is our bottleneck
      profiler.step("After dataHashing");

      profiler.end();
    })();

The output of the file:

    Debug awesomeFunction results:
    --------------------

    Starting awesomeFunction - 0 ms
    Before getSomeAwesomeData - 11 ms
    After getSomeAwesomeData - 19.329 ms
    Before dataHashing - 19.330 ms
    After dataHashing - 5.501 sec
