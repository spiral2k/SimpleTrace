const winston = require("winston");

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

  this.logger = winston.createLogger({
    format: winston.format.combine(this.loggerFormat())
  });

  if (this.options.logs) {
    this.logger.add(
      new winston.transports.Console({
        level: "debug"
      })
    );
  }

  if (this.options.writeFile) {
    this.logger.add(
      new winston.transports.File({
        filename: `SimpleTrace-${this.name}-${Date.now()}.txt`,
        level: "info"
      })
    );
  }
}

Profiler.prototype.loggerFormat = function() {
  return winston.format.printf(info => `${info.message}`);
};

Profiler.prototype.getTime = function() {
  return Date.now();
};

Profiler.prototype.step = function(stepName) {
  this.steps.push({ name: stepName, time: this.getTime() });
  if (this.options.logs) this.logger.debug(`SimpleTrace step: - ${stepName}`);
};

Profiler.prototype.convertToSec = function(time) {
  return `${time / 1000.0} sec`;
};

Profiler.prototype.convertToMs = function(time) {
  return `${time} ms`;
};

Profiler.prototype.end = function() {
  let content = `${this.name} results:\n--------------------\n\n`;
  const length = this.steps.length;
  for (let i = 0; i < length; i++) {
    const time = this.steps[i].time - this.now;
    content += `${this.steps[i].name} - ${
      time > 999 ? this.convertToSec(time) : this.convertToMs(time)
    } \n`;
  }

  if (this.options.writeFile || this.options.logs) {
    this.logger.info(`${this.options.writeFile ? "" : "\n\n"}${content}`);
  }

  if (this.options.logs) {
    this.logger.debug("SimpleTrace ended succesfully!");
  }
};

module.exports = Profiler;
