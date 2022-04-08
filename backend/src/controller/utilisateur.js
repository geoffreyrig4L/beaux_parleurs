import UtilisateurModel from "../models/utilisateur.js"

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
