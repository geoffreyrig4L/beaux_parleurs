import LikeModel from "../models/like.js"

export const createLikeForCommentaire = async (req, res) => {
  const {
    body: { utilisateurId, commentaireId, dateCreation },
  } = req

  const like = await LikeModel.query().findOne({
    likes_utilisateurs: utilisateurId,
    likes_commentaires: commentaireId,
  })

  if (like) {
    res.status(200).send("Le like existe déjà sur le commentaire.")
    return
  }

  await LikeModel.query().insert({
    likes_utilisateurs: utilisateurId,
    likes_commentaires: commentaireId,
    dateCreation,
  })

  res.status(200).send("Like ajouté sur le commentaire.")
}

export const getLikes = async (req, res) => {
  const like = await LikeModel.query()
    .select(
      "likes.id",
      "likes.dateCreation",
      "utilisateurs.id as utilisateurId",
      "utilisateurs.prenom as auteur",
      "sujets.id as sujetId ",
      "sujets.nom as nom_sujet",
      "commentaires.id as commentaireId ",
      "commentaires.contenu as contenu_commentaire"
    )
    .leftJoinRelated("[utilisateurs,sujets,commentaires]")
    .orderBy("dateCreation", "desc")

  res.status(200).send(like)
}

export const deleteLikes = async (req, res) => {
  await LikeModel.query().delete()
  res.status(200).send({ status: "LikeS supprimé." })
}
