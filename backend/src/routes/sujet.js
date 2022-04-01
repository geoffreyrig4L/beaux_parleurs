import express from "express"

import auth from "../middleware/auth.js"
import {
  getSujets,
  getSujet,
  createSujet,
  getCommentairesDuSujet,
} from "../controller/sujet.js"

const router = express.Router()

router.get("/", auth, getSujets)
router.post("/", auth, createSujet)
router.get("/:sujetId", auth, getSujet)
router.get("/:sujetId/commentaires", auth, getCommentairesDuSujet)

export default router
