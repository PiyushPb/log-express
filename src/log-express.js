const fs = require("fs");
const path = require("path");

const logLevels = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5,
  off: 6,
};

function createLogger(level, logToFile, currentLevel, logToConsole, logPerDay) {
  // Path to the logs directory and file, use process.cwd() to get project root directory
  const logsDir = path.join(process.cwd(), "logs");
  const logFileName = logPerDay
    ? `system-${new Date().toISOString().split("T")[0]}.logs`
    : "system.logs";

  const logFilePath = path.join(logsDir, logFileName);

  // Ensure the logs directory exists
  if (logToFile && !fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  return function (message) {
    const date = new Date().toLocaleString();
    const formattedMessage = `${date} [${level.toUpperCase()}]: ${message}`;

    if (logLevels[level] >= logLevels[currentLevel]) {
      if (logToFile) {
        fs.appendFile(logFilePath, formattedMessage + "\n", (err) => {
          if (err) throw err;
        });
      }

      if (logToConsole) {
        console.log(formattedMessage);
      }
    }
  };
}

function expressLogger(options = {}) {
  const logToConsole = options.consoleLog !== false;
  const logLevel = options.logLevel || "info";
  const logToFile = options.saveLogs || false;
  const logPerDay = options.logPerDay || false;

  // Create a map of log levels to logger functions
  const loggers = Object.keys(logLevels).reduce((acc, level) => {
    if (logLevels[level] >= logLevels[logLevel]) {
      acc[level] = createLogger(
        level,
        logToFile,
        logLevel,
        logToConsole,
        logPerDay
      );
    } else {
      acc[level] = () => {}; // No-op function if log level is not active
    }
    return acc;
  }, {});

  return function (req, res, next) {
    const { url, ip, method } = req;
    const start = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - start;
      const message = `${method} ${url} ${res.statusCode} ${duration}ms - ${ip}`;

      // Determine the appropriate log level
      if (res.statusCode >= 500) {
        loggers.error(message);
      } else if (res.statusCode >= 400) {
        loggers.warn(message);
      } else {
        loggers.info(message);
      }
    });

    next();
  };
}

module.exports = expressLogger;
