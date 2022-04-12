import { Model } from "objection"
import SujetModel from "./sujet.js"
import UtilisateurModel from "./utilisateur.js"
import LikeModel from "./like.js"

class CommentaireModel extends Model {
  static tableName = "commentaires"

  static get relationMappings() {
    return {
      utilisateurs: {
        modelClass: UtilisateurModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "commentaires.commentaires_utilisateurs",
          to: "utilisateurs.id",
        },
      },
      likes: {
        modelClass: LikeModel,
        relation: Model.HasManyRelation,
        join: {
          from: "commentaires.id",
          to: "likes.likes_commentaires",
        },
      },
      sujets: {
        modelClass: SujetModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "commentaires.commentaires_sujets",
          to: "sujets.id",
        },
      },
    }
  }

  $beforeInsert() {
    this.dateCreation = new Date().toISOString()
  }
}

export default CommentaireModel
