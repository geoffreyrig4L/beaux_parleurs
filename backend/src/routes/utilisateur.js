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
  "/utilisateur=:utilisateurId&commentaire=:commentaireId/likes",
  asTuLikesLeCommentaire
)
router.get("/utilisateur=:utilisateurId&sujet=:sujetId/likes", asTuLikesLeSujet)

export default router
