import express from "express"

import auth from "../middleware/auth.js"
import { getSujets, getSujet, createSujet } from "../controller/sujet.js"

const router = express.Router()

router.get("/", getSujets)
router.post("/", auth, createSujet)
router.get("/:sujetId", auth, getSujet)

export default router
