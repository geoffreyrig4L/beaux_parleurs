import CommentaireModel from "../models/commentaire.js"
import LikeModel from "../models/like.js"
import UtilisateurModel from "../models/utilisateur.js"
import SujetModel from "../models/sujet.js"

export const getUtilisateur = async (req, res) => {
  const {
    params: { utilisateurId },
  } = req

  const utilisateur = await UtilisateurModel.query().findById(utilisateurId)

  if (!utilisateur) {
    res.status(400).send({ error: "Utilisateur introuvable." })
    return
  }
  res.status(200).send(utilisateur)
}

export const getUtilisateurs = async (req, res) => {
  const utilisateurs = await UtilisateurModel.query()
    .select("utilisateurs.*")
    .orderBy("dateCreation", "desc")

  res.status(200).send(utilisateurs)
}

export const deleteUtilisateur = async (req, res) => {
  const {
    params: { utilisateurId },
  } = req

  const utilisateur = await UtilisateurModel.query().findById(utilisateurId)

  if (!utilisateur) {
    res.status(400).send({ error: "Utilisateur introuvable." })
    return
  }
  await UtilisateurModel.query().delete().where({ id: utilisateurId })
  res.status(200).send({ status: "Utilisateur supprimé." })
}

export const asTuLikesLeCommentaire = async (req, res) => {
  const {
    params: { utilisateurs_id, commentaires_id },
  } = req

  const commentaire = await CommentaireModel.query().findById(commentaires_id)

  if (!commentaire) {
    res.status(404).send({ error: "Commentaire introuvable." })
    return
  }

  const like = await LikeModel.query().findOne({
    commentaires_id,
    utilisateurs_id,
  })
  if (like) {
    res.status(200).send(true)
    return
  }
  res.status(200).send(false)
  return
}

export const asTuLikesLeSujet = async (req, res) => {
  const {
    params: { utilisateurs_id, sujets_id },
  } = req

  const sujet = await SujetModel.query().findById(sujets_id)

  if (!sujet) {
    res.status(404).send({ error: "Sujet introuvable." })
    return
  }

  const like = await LikeModel.query().findOne({
    sujets_id,
    utilisateurs_id,
  })
  if (like) {
    res.status(200).send(true)
    return
  }
  res.status(200).send(false)
  return
}
