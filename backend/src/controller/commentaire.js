import CommentaireModel from "../models/commentaire.js"

export const createCommentaire = async (req, res) => {
  const {
    body: { contenu, like, dateCreation, utilisateurs_id, sujets_id },
  } = req

  const commentaire = await CommentaireModel.query().findOne({ contenu })

  if (commentaire) {
    res.status(400).send("Ce commentaire existe déjà.")
    return
  }

  await CommentaireModel.query().insert({
    contenu,
    like,
    sujets_id,
    utilisateurs_id,
    dateCreation,
  })

  res.status(200).send({})
}

export const getCommentaires = async (req, res) => {
  /*const {
    params: { trieur, sens },
  } = req

  if (!trieur) {
    trieur = "dateCreation"
  }
  if (!sens) {
    sens = "desc"
  }*/

  const trieur = "dateCreation"
  const sens = "desc"

  const commentaires = await CommentaireModel.query()
    .select(
      "commentaires.id",
      "commentaires.contenu",
      "commentaires.like",
      "commentaires.dateCreation",
      "utilisateurs.prenom as auteur",
      "sujets.nom as nom_sujet"
    )
    .leftJoinRelated("[utilisateurs,sujets]")
    .orderBy(trieur, sens)

  res.status(200).send(commentaires)
}

export const modifyCommentaire = async (req, res) => {
  const {
    params: { commentaireId },
    body: { contenu, like },
  } = req

  const commentaire = await CommentaireModel.query().updateAndFetchById(
    commentaireId,
    { contenu, like }
  )

  if (!commentaire) {
    res.status(200).send({ error: "Commentaire introuvable." })
    return
  }
  res.status(200).send({ status: "Commentaire modifiée." })
}

export const deleteCommentaire = async (req, res) => {
  const {
    params: { commentaireId },
  } = req

  const commentaire = await CommentaireModel.query().findById(commentaireId)

  if (!commentaire) {
    res.status(400).send({ error: "Commentaire introuvable." })
    return
  }
  await CommentaireModel.query().delete().where({ id: commentaireId })
  res.status(200).send({ status: "Commentaire supprimé." })
}

export const getCommentaire = async (req, res) => {
  const {
    params: { commentaireId },
  } = req

  const commentaire = await CommentaireModel.query().findById(commentaireId)

  if (!commentaire) {
    res.status(400).send({ error: "Commentaire introuvable." })
    return
  }
  res.status(200).send(commentaire)
}
