import express from "express"
import auth from "../middleware/auth.js"
import {
  getUtilisateur,
  getUtilisateurs,
  deleteUtilisateur,
} from "../controller/utilisateur.js"

const router = express.Router()

router.get("/:utilisateurId", auth, getUtilisateur)
router.get("/", auth, getUtilisateurs)
router.delete("/:utilisateurId", auth, deleteUtilisateur)

export default router
