const fs = require("fs");

function Profiler(name, options = {}) {
  if (!name) {
    throw new Error("SimpleTrace: name should not be empty");
  }

  if (typeof name !== "string") {
    throw new Error("SimpleTrace: name should be a string");
  }

  if ((typeof options !== "undefined" && typeof options !== 'object') || options === null) {
    throw new Error("SimpleTrace: options should be object");
  }

  const ProfilerName = name.replace(/[^A-Z0-9]/gi, "_");

  if (!Profiler.instance) Profiler.instance = {};

  if (Profiler.instance[ProfilerName]) return Profiler.instance[ProfilerName];
  Profiler.instance[ProfilerName] = this;

  this.name = name;
  this.now = Date.now();
  this.steps = [];
  this.options = options;
}

Profiler.prototype.logger = function(text) {
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
  const writeDir = `${process.cwd()}/${this.options.dir || "simpleTrace"}`;
  if (!fs.existsSync(writeDir)) {
    fs.mkdirSync(writeDir);
  }
  return writeDir;
};

Profiler.prototype.end = function(callback) {
  if (callback && typeof callback === 'function') this.cb = callback;

  let content = `${this.name} result:\n--------------------\n\n`;
  const length = this.steps.length;
  for (let i = 0; i < length; i++) {
    const time = this.steps[i].time - this.now;
    content += `${this.steps[i].name} - ${
      time > 999 ? this.convertToSec(time) : this.convertToMs(time)
    }\n`;
    if ((i + 1) >= length) {
      content += `\n--------------------\n\n`;
    }
  }

  if (this.options.writeFile) {
    const writeStream = fs.createWriteStream(`${this.getWritePath()}/SimpleTrace-${this.name}-${Date.now()}.txt`);
    writeStream.write(content, 'utf8');
    writeStream.end();

    writeStream.on('finish', () => {
      if (this.cb) {
        this.cb();
      }
      this.logger(`SimpleTrace: ${this.name} ended succesfully!`);
    });

    writeStream.on('error', (er) => {
      this.logger('SimpleTrace Error:', er);
    });
  }

  if (this.options.logs) {
    this.logger(`\n${content}`);
    if (!this.options.writeFile) this.logger(`SimpleTrace: ${this.name} ended succesfully!`);
  }
};

module.exports = Profiler;
