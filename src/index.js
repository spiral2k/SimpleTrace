const fs = require("fs");

function Profiler(name, options = {}) {
  if (!name) {
    throw new Error("SimpleTrace - name should not be empty");
  }

  if (typeof name !== "string") {
    throw new Error("SimpleTrace - name should be a string");
  }

  const ProfilerName = name.replace(/[^A-Z0-9]/gi, "_");

  if (!Profiler.instance) Profiler.instance = {};

  if (Profiler.instance[ProfilerName]) return Profiler.instance[ProfilerName];
  Profiler.instance[ProfilerName] = this;

  this.name = name;
  this.now = Date.now();
  this.steps = [];
  this.options = options;

  this.logger = this.log;
}

Profiler.prototype.log = function(text) {
  return process.stdout.write(`\n${text}`, "utf8");
};

Profiler.prototype.getTime = function() {
  return Date.now();
};

Profiler.prototype.step = function(stepName) {
  this.steps.push({ name: stepName, time: this.getTime() });
  if (this.options.logs) {
    this.logger(`SimpleTrace ${this.name} step: ${stepName}`);
  }
};

Profiler.prototype.convertToSec = function(time) {
  return `${time / 1000.0} sec`;
};

Profiler.prototype.convertToMs = function(time) {
  return `${time} ms`;
};

Profiler.prototype.getWritePath = function() {
  if (this.options.dir) {
    const writeDir = `${process.cwd()}/${this.options.dir}`;
    if (!fs.existsSync(writeDir)) {
      fs.mkdirSync(writeDir);
    }
    return writeDir;
  }

  return process.cwd();
};

Profiler.prototype.end = function() {
  let content = `${this.name} result:\n--------------------\n\n`;
  const length = this.steps.length;
  for (let i = 0; i < length; i++) {
    const time = this.steps[i].time - this.now;
    content += `${this.steps[i].name} - ${
      time > 999 ? this.convertToSec(time) : this.convertToMs(time)
    }\n`;
  }

  if (this.options.writeFile) {
    fs.writeFile(
      `${this.getWritePath()}/SimpleTrace-${this.name}-${Date.now()}.txt`,
      content,
      function(err) {
        if (err) throw err;
        this.logger(`SimpleTrace: ${this.name} ended succesfully!`);
      }.bind(this)
    );
  }

  if (!this.options.writeFile && this.options.logs) {
    this.logger(`\n${content}`);
    this.logger(`SimpleTrace: ${this.name} ended succesfully!`);
  }
};

module.exports = Profiler;
