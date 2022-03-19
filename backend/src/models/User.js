import { Model } from "objection"
import { randomBytes, pbkdf2Sync } from "crypto"
import config from "../config.js"

const {
  security: {
    password: { saltLength, iterations, keylen, digest },
  },
} = config

class UserModel extends Model {
  static tableName = "users"

  checkPassword = (password) => {
    const [hash] = UserModel.hashPassword(password, this.passwordSalt)
    return hash === this.passwordHash
  }
  static hashPassword = (
    password,
    salt = randomBytes(saltLength).toString("hex")
  ) => [
    pbkdf2Sync(password, salt, iterations, keylen, digest).toString("hex"),
    salt,
  ]
}

export default UserModel
