import "dotenv/config"
import chalk from "chalk" //affiche les messages en couleur
import * as yup from "yup"

const portValidator = yup.number().integer()

//on insere dans le schema uniquement les données qui ne sont pas en dur dans la const rawConfig

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
          password: yup.string().required(),
          host: yup.string(),
          port: portValidator,
        })
        .required(),
    })
    .required(),
  security: yup.object().shape({
    password: yup.object().shape({
      secret: yup.string().min(32).required(),
    }),
  }),
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
  security: {
    password: {
      saltLength: 32,
      iterations: 10000,
      keylen: 256,
      digest: "sha512",
      expiresIn: "2 days",
      secret: process.env.JWT_SECRET,
    },
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
