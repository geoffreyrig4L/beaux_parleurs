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
          from: "commentaires.utilisateurs_id",
          to: "utilisateurs.id",
        },
      },
      likes: {
        modelClass: LikeModel,
        relation: Model.HasManyRelation,
        join: {
          from: "commentaires.id",
          to: "likes.commentaires_id",
        },
      },
      sujets: {
        modelClass: SujetModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "commentaires.sujets_id",
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
