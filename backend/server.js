import express from "express";
import pino from "pino";
import config from "./src/config.js";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

const app = express();

app.listen(3001, () => logger.info(`Listening on ${config.port}`));
