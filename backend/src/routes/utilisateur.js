import express from "express"
import auth from "../middleware/auth.js"
import { getUtilisateur } from "../controller/utilisateur.js"

const router = express.Router()

router.get("/:id", auth, getUtilisateur)

export default router
