import { Model } from "objection"

class UserModel extends Model {
  static tableName = "users"

  checkPassword = (password) => {
    const [hash] = hashPassword(password, this.passwordSalt)
    return hash === this.passwordHash
  }
}

export default UserModel
