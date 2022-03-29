import { Model } from "objection"
import SujetModel from "./Sujet"
import UtilisateurModel from "./Utilisateur"

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
}

export default CommentaireModel
