import express from "express"
import knex from "knex"
import { Model } from "objection"
import pino from "pino"
import config from "./src/config.js"
import sessionRoutes from "./src/routes/session.js"

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
})

const db = knex(config.db)
const app = express()

app.use(express.json())

Model.knex(db)

sessionRoutes({ app })

app.listen(3001, () => logger.info(`Listening on ${config.port}`))
