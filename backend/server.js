import express from "express"
import knex from "knex"
import { Model } from "objection"
import pino from "pino"
import config from "./src/config.js"
import cors from "cors"
import sessionRoutes from "./src/routes/session.js"
import sujetRoutes from "./src/routes/sujet.js"
import commentaireRoutes from "./src/routes/commentaire.js"
import utilisateurRoutes from "./src/routes/utilisateur.js"

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

app.use(
  cors({
    origin: process.env.WEB_APP_ORIGIN,
  })
)

app.use("/sessions", sessionRoutes)
app.use("/utilisateurs", utilisateurRoutes)
app.use("/sujets", sujetRoutes)
app.use("/commentaires", commentaireRoutes)

app.listen(3001, () => logger.info(`Listening on ${config.port}`))
