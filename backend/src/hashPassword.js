import { randomBytes, pbkdf2Sync } from "crypto"
import config from "./config"

const {
  security: {
    password: { saltLength, iterations, keylen, digest },
  },
} = config

const hashPassword = (
  password,
  salt = randomBytes(saltLenght).toString("hex")
) => [
  pbkdf2Sync(password, salt, iterations, keylen, digest).toString("hex"),
  salt,
]

export default hashPassword
