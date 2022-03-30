import SujetModel from "../models/sujet.js"

export const createSujet = async (req, res) => {
  const {
    body: { nom, like, utilisateurs_id, dateCreation },
  } = req

  const sujet = await SujetModel.query().findOne({ nom })

  if (sujet) {
    res.status(400).send("Ce sujet existe déjà.")
    return
  }

  await SujetModel.query().insert({
    nom,
    like,
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
      "sujets.like",
      "sujets.dateCreation",
      "utilisateurs.nom as auteur"
    )
    .leftJoinRelated("utilisateurs")
    .orderBy("dateCreation", "desc")

  res.status(200).send({ sujets })
}

export const getSujet = async (req, res) => {
  const {
    params: { sujetId },
  } = req

  console.log(sujetId)
  const sujet = await SujetModel.query().findById(sujetId)

  if (!sujet) {
    res.status(400).send({ error: "Sujet introuvable." })
    return
  }

  res.status(200).send(sujet)
}
