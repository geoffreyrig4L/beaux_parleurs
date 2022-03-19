import UserModel from "../db/models/User.js"
import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"

const sessionRoutes = ({ app }) => {
  app.post("sign-up", async (req, res) => {
    const {
      body: { email, password },
    } = req

    const existingUser = await UserModel.query().findOne({ email })

    if (existingUser) {
      res.send({})
      return
    }

    const [hash, salt] = UserModel.hashPassword(password)

    await UserModel.query().insert({
      email,
      passwordHash: hash,
      passwordSalt: salt,
    })

    req.send({})
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
    res.send({ data: jwt })
  })
}

export default sessionRoutes
