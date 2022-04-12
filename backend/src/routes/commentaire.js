import express from "express"
import {
  getCommentaires,
  modifyCommentaire,
  deleteCommentaire,
  createCommentaire,
  getCommentaire,
} from "../controller/commentaire.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/", getCommentaires)
router.put("/:commentaireId", auth, modifyCommentaire)
router.post("/", auth, createCommentaire)
router.delete("/:commentaireId", auth, deleteCommentaire)
router.get("/:commentaireId", getCommentaire)

export default router
