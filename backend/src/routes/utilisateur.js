import express from "express"
import { getUtilisateur } from "../controller/utilisateur.js"

const router = express.Router()

router.get("/:utilisateurId", getUtilisateur)

export default router
