import express from "express"

import auth from "../middleware/auth.js"
import {
  getSujets,
  getSujet,
  createSujet,
  getCommentairesDuSujet,
  createCommentaireInSujet,
  getSujetByNom,
  deleteSujet,
} from "../controller/sujet.js"

const router = express.Router()

router.get("/", getSujets)
router.post("/", auth, createSujet)
router.get("/nom=:sujetNom", getSujetByNom)
router.get("/id=:sujetId", getSujet)
router.get("/:sujetId/commentaires", getCommentairesDuSujet)
router.post("/:sujetId/commentaires", auth, createCommentaireInSujet)
router.delete("/:sujetId", auth, deleteSujet)

export default router
