const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.js")
const utilisateurController = require("../controller/utilisateur")

router.get("/", auth, utilisateurController.getOneUtilisateur)
router.put("/:id", auth, utilisateurController.modifyUtilisateur)
router.post("/", auth, utilisateurController.createUtilisateur)
router.post("/:id", auth, utilisateurController.deleteUtilisateur)
