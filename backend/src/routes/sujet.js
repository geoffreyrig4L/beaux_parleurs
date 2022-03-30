import express from "express"

import auth from "../middleware/auth.js"
import { getSujets, getSujet, createSujet } from "../controller/sujet.js"

const router = express.Router()

router.get("/", auth, getSujets)
router.post("/", auth, createSujet)
router.post("/:id", auth, getSujet)

export default router
