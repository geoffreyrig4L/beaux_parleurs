import express from "express"

import auth from "../middleware/auth.js"
import {
  createLikeForCommentaire,
  getLikes,
  deleteLikes,
} from "../controller/like.js"

const router = express.Router()

router.post("/commentaire", auth, createLikeForCommentaire)
router.get("/", getLikes)
router.delete("/", deleteLikes)

export default router
