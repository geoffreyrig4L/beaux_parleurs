import { Model } from "objection"
import SujetModel from "./sujet.js"
import CommentaireModel from "./commentaire.js"
import UtilisateurModel from "./utilisateur.js"

class LikeModel extends Model {
  static tableName = "likes"

  static get relationMappings() {
    return {
      utilisateurs: {
        modelClass: UtilisateurModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "likes.likes_utilisateurs",
          to: "utilisateurs.id",
        },
      },
      commentaires: {
        modelClass: CommentaireModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "likes.likes_commentaires",
          to: "commentaires.id",
        },
      },
      sujets: {
        modelClass: SujetModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "likes.likes_sujets",
          to: "sujets.id",
        },
      },
    }
  }
  $beforeInsert() {
    this.dateCreation = new Date().toISOString()
  }
}

export default LikeModel
