import SujetModel from "../models/sujet.js"
import CommentaireModel from "../models/commentaire.js"

export const createSujet = async (req, res) => {
  const {
    body: { nom, utilisateurId, dateCreation },
  } = req

  const sujet = await SujetModel.query().findOne({ nom })

  if (sujet) {
    res.status(200).send("Le sujet existe déjà.")
    return
  }

  await SujetModel.query().insert({
    nom,
    sujets_utilisateurs: utilisateurId,
    dateCreation,
  })

  res.status(200).send({})
}

export const getSujets = async (req, res) => {
  const sujets = await SujetModel.query()
    .select(
      "sujets.id",
      "sujets.nom",
      "sujets.dateCreation",
      "utilisateurs.prenom as auteur"
    )
    .leftJoinRelated("utilisateurs")
    .orderBy("dateCreation", "desc")

  res.status(200).send(sujets)
}

export const getSujet = async (req, res) => {
  const {
    params: { sujetId },
  } = req

  const sujet = await SujetModel.query().findById(sujetId)

  if (!sujet) {
    res.status(400).send({ error: "Sujet introuvable." })
    return
  }

  res.status(200).send(sujet)
}

export const getCommentairesDuSujet = async (req, res) => {
  const {
    params: { sujetId },
  } = req

  const sujet = await SujetModel.query().findById(sujetId)

  if (!sujet) {
    res.status(404).send({ error: "Sujet introuvable." })

    return
  }

  const commentaires = await CommentaireModel.query()
    .select(
      "commentaires.id",
      "commentaires.contenu",
      "utilisateurs.id as commentaires_utilisateurs",
      "commentaires.dateCreation",
      "utilisateurs.prenom as auteur",
      CommentaireModel.relatedQuery("likes").count().as("totalLikes")
    )
    .leftJoinRelated("[sujets,utilisateurs]")
    .where({ commentaires_sujets: sujetId })
    .orderBy("commentaires.dateCreation", "asc")

  res.status(200).send(commentaires)
}

export const createCommentaireInSujet = async (req, res) => {
  const {
    params: { sujetId },
    body: { contenu, dateCreation, utilisateurId, commentaires_sujets },
  } = req

  const sujet = await SujetModel.query().findById(sujetId)

  if (!sujet) {
    res.status(404).send("Sujet du commentaire introuvable.")
    return
  }

  await CommentaireModel.query().insert({
    contenu,
    dateCreation,
    commentaires_utilisateurs: utilisateurId,
    commentaires_sujets,
  })

  res.status(200).send({ status: "Commentaire créé." })
}

export const getSujetByNom = async (req, res) => {
  const {
    params: { sujetNom },
  } = req

  const sujet = await SujetModel.query().findOne({ nom: sujetNom })
  if (!sujet) {
    res.status(404).send("Sujet introuvable.")
    return
  }

  res.status(200).send(sujet)
}

export const deleteSujet = async (req, res) => {
  const {
    params: { sujetId },
  } = req

  const sujet = await SujetModel.query().findById(sujetId)

  if (!sujet) {
    res.status(404).send({ error: "Sujet introuvable." })
    return
  }

  await SujetModel.query().delete().where({ id: sujetId })
  res.status(200).send({ status: "Sujet supprimé." })
}

export const createSujetPlusComment = async (req, res) => {
  const {
    body: { nom, utilisateurId, dateCreation, contenu },
  } = req

  const sujet = await SujetModel.query().findOne({ nom })

  if (sujet) {
    res.status(200).send("Le sujet existe déjà.")
    return
  }

  await SujetModel.query().insert({
    nom,
    sujets_utilisateurs: utilisateurId,
    dateCreation,
  })

  const sujetToSupply = await SujetModel.query().findOne({ nom })

  await CommentaireModel.query().insert({
    contenu,
    commentaires_utilisateurs: utilisateurId,
    dateCreation,
    commentaires_sujets: sujetToSupply.id,
  })

  res.status(200).send({})
}
