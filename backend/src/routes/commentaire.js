const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.js")
const commentaireController = require("../controller/commentaire")

router.get("/", auth, commentaireController.getOneCommentaire)
router.put("/:id", auth, commentaireController.modifyCommentaire)
router.post("/", auth, commentaireController.createCommentaire)
router.post("/:id", auth, commentaireController.deleteCommentaire)
