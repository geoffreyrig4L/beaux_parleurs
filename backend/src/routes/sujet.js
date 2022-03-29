const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.js")
const sujetController = require("../controller/sujet")

router.get("/", auth, sujetController.getOneSujet)
router.put("/:id", auth, sujetController.modifySujet)
router.post("/", auth, sujetController.createSujet)
router.post("/:id", auth, sujetController.deleteSujet)
