import express from "express"

import {
  createLikeForSujet,
  createLikeForCommentaire,
  getLikes,
} from "../controller/like.js"

const router = express.Router()

router.post("/sujet", createLikeForSujet)
router.post("/commentaire", createLikeForCommentaire)
router.get("/", getLikes)

export default router
