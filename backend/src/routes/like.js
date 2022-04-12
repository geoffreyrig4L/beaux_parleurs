import express from "express"

import auth from "../middleware/auth.js"
import {
  createLikeForSujet,
  createLikeForCommentaire,
  getLikes,
  deleteLikeForSujet,
  deleteLikeForCommentaire,
} from "../controller/like.js"

const router = express.Router()

router.post("/sujet", auth, createLikeForSujet)
router.post("/commentaire", auth, createLikeForCommentaire)
router.get("/", getLikes)
router.delete(
  "/utilisateur=:utilisateurs_id&sujet=:sujets_id",
  auth,
  deleteLikeForSujet
)
router.delete(
  "/utilisateur=:utilisateurs_id&commentaire=:commentaires_id",
  auth,
  deleteLikeForCommentaire
)

export default router
