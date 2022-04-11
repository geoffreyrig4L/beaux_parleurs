import SujetModel from "../models/sujet.js"
import CommentaireModel from "../models/commentaire.js"

export const createSujet = async (req, res) => {
  const {
    body: { nom, utilisateurs_id, dateCreation },
  } = req

  const sujet = await SujetModel.query().findOne({ nom })

  if (sujet) {
    res.status(200).send("Le sujet existe déjà.")
    return
  }

  await SujetModel.query().insert({
    nom,
    utilisateurs_id: utilisateurs_id,
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
      "utilisateurs.id as utilisateurs_id",
      "commentaires.dateCreation",
      "utilisateurs.prenom as auteur"
    )
    .leftJoinRelated("sujets")
    .leftJoinRelated("utilisateurs")
    .where({ sujets_id: sujetId })
    .orderBy("commentaires.dateCreation", "asc")

  res.status(200).send(commentaires)
}

export const createCommentaireInSujet = async (req, res) => {
  const {
    params: { sujetId },
    body: { contenu, dateCreation, utilisateurs_id, sujets_id },
  } = req

  const sujet = await SujetModel.query().findById(sujetId)

  if (!sujet) {
    res.status(404).send("Sujet du commentaire introuvable.")
    return
  }

  await CommentaireModel.query().insert({
    contenu,
    dateCreation,
    utilisateurs_id,
    sujets_id,
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
    body: { nom, utilisateurs_id, dateCreation, contenu },
  } = req

  const sujet = await SujetModel.query().findOne({ nom })

  if (sujet) {
    res.status(200).send("Le sujet existe déjà.")
    return
  }

  await SujetModel.query().insert({
    nom,
    utilisateurs_id: utilisateurs_id,
    dateCreation,
  })

  const sujetToSupply = await SujetModel.query().findOne({ nom })

  await CommentaireModel.query().insert({
    contenu,
    utilisateurs_id: utilisateurs_id,
    dateCreation,
    sujets_id: sujetToSupply.id,
  })

  res.status(200).send({})
}
