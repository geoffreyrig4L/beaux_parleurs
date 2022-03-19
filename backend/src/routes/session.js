import UserModel from "../db/models/User.js"

const sessionRoutes = ({ app }) => {
  app.post("sign-up", async (req, res) => {
    const {
      body: { email, password },
    } = req

    const existingUser = await UserModel.query().findOne({ email })

    if (existingUser) {
      res.send({ status: "OK" })
      return
    }
    await UserModel.query().insert({
      email,
      passwordHash: 123,
      passwordSalt: "1232",
    })
  })
}

export default sessionRoutes
