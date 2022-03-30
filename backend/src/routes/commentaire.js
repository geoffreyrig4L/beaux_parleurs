import express from "express"
import {
  getCommentaires,
  modifyCommentaire,
  deleteCommentaire,
} from "../controller/commentaire.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/sujets/:id/commentaire?trierPar=:trieur", auth, getCommentaires)
router.put("/:id", auth, modifyCommentaire)
//router.post("/", auth, createCommentaire)
router.post("/:id", auth, deleteCommentaire)

export default router
