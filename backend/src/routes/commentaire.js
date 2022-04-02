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

//commentaires?trierPar=:trieur&sens=:sens/

router.get("/", auth, getCommentaires)
router.put("/:commentaireId", auth, modifyCommentaire)
router.post("/", auth, createCommentaire)
router.delete("/:commentaireId", auth, deleteCommentaire)
router.get("/:commentaireId", auth, getCommentaire)

export default router
