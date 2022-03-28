import UserModel from "../models/User.js"
import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"
import auth from "../middlewares/auth.js"

const sessionRoutes = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    const {
      body: {
        prenom,
        nom,
        email,
        password,
        dateNaissance,
        adresse,
        ville,
        codePostal,
        pays,
        telephone,
      },
    } = req

    const existingUser = await UserModel.query().findOne({ email })

    if (existingUser) {
      res.send({})
      return
    }

    const [hash, salt] = UserModel.hashPassword(password)

    await UserModel.query().insert({
      prenom,
      nom,
      email,
      passwordHash: hash,
      passwordSalt: salt,
      dateNaissance,
      adresse,
      ville,
      codePostal,
      pays,
      telephone,
    })

    res.send({})
  })
  app.post("/sign-in", async (req, res) => {
    const {
      body: { email, password },
    } = req

    const user = await UserModel.query().findOne({ email })

    if (!user || !user.checkPassword(password)) {
      res.status(401).send({ error: "Invalid credentials" })
      return
    }
    const jwt = jsonwebtoken.sign(
      {
        payload: { user: { id: user.id, email: user.email } },
      },
      config.security.password.secret,
      { expiresIn: config.security.password.expiresIn }
    )
    res.send({ jwt })
  })
}

export default sessionRoutes
