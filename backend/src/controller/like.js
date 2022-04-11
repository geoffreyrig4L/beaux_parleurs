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
