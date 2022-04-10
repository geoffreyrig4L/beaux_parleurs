import { Model } from "objection"
import SujetModel from "./sujet.js"
import UtilisateurModel from "./utilisateur.js"

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

  $beforeInsert() {
    this.like = 0
  }
}

export default CommentaireModel
