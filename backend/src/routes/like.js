import express from "express"

import auth from "../middleware/auth.js"
import {
  createLikeForSujet,
  createLikeForCommentaire,
  getLikes,
  deleteLikeForSujet,
  deleteLikeForCommentaire,
  deleteLikes,
} from "../controller/like.js"

const router = express.Router()

router.post("/sujet", auth, createLikeForSujet)
router.post("/commentaire", auth, createLikeForCommentaire)
router.get("/", getLikes)
router.delete(
  "/utilisateur=:utilisateurId&sujet=:sujetId",
  auth,
  deleteLikeForSujet
)
router.delete(
  "/utilisateur=:utilisateurId&commentaire=:commentaireId",
  auth,
  deleteLikeForCommentaire
)
router.delete("/", deleteLikes)

export default router
