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
