import { query } from "express"
import LikeModel from "../models/like.js"

export const createLikeForSujet = async (req, res) => {
  const {
    body: { utilisateurs_id, sujets_id, dateCreation },
  } = req

  const like = await LikeModel.query().findOne({
    utilisateurs_id: utilisateurs_id,
    sujets_id: sujets_id,
  })

  if (like) {
    res.status(200).send("Le like existe déjà sur le sujet.")
    return
  }

  await LikeModel.query().insert({
    utilisateurs_id,
    sujets_id,
    dateCreation,
  })

  res.status(200).send("Like ajouté sur le sujet.")
}

export const createLikeForCommentaire = async (req, res) => {
  const {
    body: { utilisateurs_id, commentaires_id, dateCreation },
  } = req

  const like = await LikeModel.query().findOne({
    utilisateurs_id: utilisateurs_id,
    commentaires_id: commentaires_id,
  })

  if (like) {
    res.status(200).send("Le like existe déjà sur le commentaire.")
    return
  }

  await LikeModel.query().insert({
    utilisateurs_id,
    commentaires_id,
    dateCreation,
  })

  res.status(200).send("Like ajouté sur le commentaire.")
}

export const getLikes = async (req, res) => {
  const like = await LikeModel.query()
    .select(
      "likes.id",
      "likes.dateCreation",
      "utilisateurs.id as utilisateurs_id",
      "utilisateurs.prenom as auteur",
      "sujets.id as sujets_id ",
      "sujets.nom as nom_sujet",
      "commentaires.id as commentaires_id ",
      "commentaires.contenu as contenu_commentaire"
    )
    .leftJoinRelated("[utilisateurs,sujets,commentaires]")
    .orderBy("dateCreation", "desc")

  res.status(200).send(like)
}

export const deleteLikeForSujet = async (req, res) => {
  const {
    params: { utilisateurs_id, sujets_id },
  } = req

  const like = await LikeModel.query().findOne({
    sujets_id: sujets_id,
    utilisateurs_id: utilisateurs_id,
  })

  if (!like) {
    res.status(404).send("Le like n'existe pas.")
    return
  }

  await LikeModel.query()
    .delete()
    .where({ sujets_id: sujets_id, utilisateurs_id: utilisateurs_id })
  res.status(200).send({ status: "Like supprimé." })
}

export const deleteLikeForCommentaire = async (req, res) => {
  const {
    params: { utilisateurs_id, commentaires_id },
  } = req

  const like = await LikeModel.query().findOne({
    commentaires_id: commentaires_id,
    utilisateurs_id: utilisateurs_id,
  })

  if (!like) {
    res.status(404).send("Le like n'existe pas.")
    return
  }

  await LikeModel.query().delete().where({
    commentaires_id: commentaires_id,
    utilisateurs_id: utilisateurs_id,
  })
  res.status(200).send({ status: "Like supprimé." })
}
