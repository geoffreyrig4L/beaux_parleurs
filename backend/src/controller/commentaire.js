import CommentaireModel from "../models/commentaire.js"

export const getCommentaires = async (req, res) => {
  const {
    params: { sujetId, trieur },
  } = req

  if (!trieur) {
    trieur = "dateCreation"
  }

  const commentaire = await CommentaireModel.query()
    .select("commentaires.*", "utilisateurs.nom")
    .leftJoinRelated("[utilisateurs,sujets]")
    .orderBy({ trieur }, "desc")
    .where(sujetId)

  res.status(200).send(commentaire)
}

export const modifyCommentaire = async (req, res) => {
  const {
    params: { commentaireId },
    body: { contenu },
  } = req

  const commentaire = CommentaireModel.query().updateAndFetchById(
    commentaireId,
    { contenu }
  )

  if (!commentaire) {
    res.status(200).send({ error: "Commentaire introuvable." })
    return
  }
  res.status(200).send({ status: "Commentaire modifiee." })
}

export const deleteCommentaire = async (req, res) => {
  const {
    params: { commentaireId },
  } = req

  const commentaire = CommentaireModel.query().findById(commentaireId)

  if (!commentaire) {
    res.status(400).send({ error: "Commentaire introuvable." })
    return
  }
  CommentaireModel.query().deleteById(commentaireId)
  res.status(200).send({ status: "Commentaire supprimé." })
}
