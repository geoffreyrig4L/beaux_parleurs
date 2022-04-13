import { Model } from "objection"
import UtilisateurModel from "./utilisateur.js"
import CommentaireModel from "./commentaire.js"

class SujetModel extends Model {
  static tableName = "sujets"

  static get relationMappings() {
    return {
      utilisateurs: {
        modelClass: UtilisateurModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "sujets.sujets_utilisateurs",
          to: "utilisateurs.id",
        },
      },
      commentaires: {
        modelClass: CommentaireModel,
        relation: Model.HasManyRelation,
        join: {
          from: "sujets.id",
          to: "commentaires.commentaires_sujets",
        },
      },
    }
  }

  $beforeInsert() {
    this.dateCreation = new Date().toISOString()
  }
}

export default SujetModel
