import express from "express"

import auth from "../middleware/auth.js"
import {
  getSujets,
  getSujet,
  createSujet,
  getCommentairesDuSujet,
  createCommentaireInSujet,
} from "../controller/sujet.js"

const router = express.Router()

router.get("/", getSujets)
router.post("/", auth, createSujet)
router.get("/:sujetId", getSujet)
router.get("/:sujetId/commentaires", getCommentairesDuSujet)
router.post("/:sujetId/commentaires", auth, createCommentaireInSujet)

export default router
