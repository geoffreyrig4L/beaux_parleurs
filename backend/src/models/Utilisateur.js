import { Model } from "objection"
import { randomBytes, pbkdf2Sync } from "crypto"
import config from "../config.js"
import SujetModel from "./sujet.js"
import CommentaireModel from "./commentaire.js"
import LikeModel from "./Like.js"

const {
  security: {
    password: { saltLength, iterations, keylen, digest },
  },
} = config

class UtilisateurModel extends Model {
  static tableName = "utilisateurs"

  static get relationMappings() {
    return {
      sujets: {
        modelClass: SujetModel,
        relation: Model.HasManyRelation,
        join: {
          from: "utilisateurs.id",
          to: "sujets.sujets_utilisateurs",
        },
      },
      likes: {
        modelClass: LikeModel,
        relation: Model.HasManyRelation,
        join: {
          from: "utilisateurs.id",
          to: "likes.likes_utilisateurs",
        },
      },
      commentaires: {
        modelClass: CommentaireModel,
        relation: Model.HasManyRelation,
        join: {
          from: "utilisateurs.id",
          to: "commentaires.commentaires_utilisateurs",
        },
      },
    }
  }
  checkPassword = (password) => {
    const [hash] = UtilisateurModel.hashPassword(password, this.passwordSalt)
    return hash === this.passwordHash
  }
  static hashPassword = (
    password,
    salt = randomBytes(saltLength).toString("hex")
  ) => [
    pbkdf2Sync(password, salt, iterations, keylen, digest).toString("hex"),
    salt,
  ]

  $beforeInsert() {
    this.dateCreation = new Date().toISOString()
  }
}

export default UtilisateurModel
