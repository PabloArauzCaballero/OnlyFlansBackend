const pino = require("pino");

const logger = pino({
  name: "onlyflans-api",
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino/file",
    options: {
      destination: process.env.LOG_FILE || "./logs/app.log",
      mkdir: true,
    },
  },
});

module.exports = logger;
