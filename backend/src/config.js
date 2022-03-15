import "dotenv/config"
import chalk from "chalk" //affiche les messages en couleur
import * as yup from "yup"

const portValidator = yup.number().integer()

const schema = yup.object().shape({
  port: yup.number().integer().required().getDefault(),
  db: yup
    .object()
    .shape({
      client: yup.string().oneOf(["pg", "mysql", "mysql2"]),
      connection: yup
        .object()
        .shape({
          database: yup.string().required(),
          user: yup.string().required(),
          password: yup.string(),
          host: yup.string(),
          port: portValidator,
        })
        .required(),
    })
    .required(),
})

const rawConfig = {
  port: process.env.PORT,
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
    },
    migrations: { stub: "./src/db/migration.stub.js" },
  },
}

try {
  schema.validateSync(rawConfig, { abortEaly: false })
} catch (err) {
  console.error(err)
  throw new Error(
    `${chalk.red("🔴 ValidationError : ")} \n - ${err.errors
      .map((msg) => chalk.blue(msg))
      .join("\n - ")}`
  )
}

const config = schema.cast(rawConfig)

export default config

//5 à 50 min sur la vidéo de la partie 1
