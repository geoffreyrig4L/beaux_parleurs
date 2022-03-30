import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"

const { JsonWebTokenError } = jsonwebtoken

const auth = async (req, res, next) => {
  const {
    headers: { authentification: jwt },
  } = req

  if (!jwt) {
    res.status(403).send({ error: "no pasaran !" })
    return
  }
  try {
    const payload = jsonwebtoken.verify(jwt, config.security.password.secret)
    req.payload = payload
    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.status(403).send({ error: "no pasaran !" })
      return
    } else {
      res.status(500).send({ error: "oopsi" })
    }
  }
}

export default auth
