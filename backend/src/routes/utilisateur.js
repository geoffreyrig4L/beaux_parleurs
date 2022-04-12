import express from "express"
import auth from "../middleware/auth.js"
import {
  getUtilisateur,
  getUtilisateurs,
  deleteUtilisateur,
  asTuLikesLeCommentaire,
  asTuLikesLeSujet,
} from "../controller/utilisateur.js"

const router = express.Router()

router.get("/:utilisateurId", auth, getUtilisateur)
router.get("/", auth, getUtilisateurs)
router.delete("/:utilisateurId", auth, deleteUtilisateur)
router.get(
  "/utilisateur=:utilisateurs_id&commentaire=:commentaires_id/likes",
  asTuLikesLeCommentaire
)
router.get(
  "/utilisateur=:utilisateurs_id&sujet=:sujets_id/likes",
  asTuLikesLeSujet
)

export default router
