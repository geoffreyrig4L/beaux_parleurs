import { Model } from "objection"
import UtilisateurModel from "./utilisateur.js"
import CommentaireModel from "./commentaire.js"
import LikeModel from "./like.js"

class SujetModel extends Model {
  static tableName = "sujets"

  static get relationMappings() {
    return {
      utilisateurs: {
        modelClass: UtilisateurModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "sujets.utilisateurs_id",
          to: "utilisateurs.id",
        },
      },
      likes: {
        modelClass: LikeModel,
        relation: Model.HasManyRelation,
        join: {
          from: "sujets.id",
          to: "likes.sujets_id",
        },
      },
      commentaires: {
        modelClass: CommentaireModel,
        relation: Model.HasManyRelation,
        join: {
          from: "sujets.id",
          to: "commentaires.sujets_id",
        },
      },
    }
  }

  $beforeInsert() {
    this.dateCreation = new Date().toISOString()
  }
}

export default SujetModel
