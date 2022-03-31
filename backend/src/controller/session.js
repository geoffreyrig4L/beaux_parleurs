import UtilisateurModel from "../models/utilisateur.js"
import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"

export const signUp = async (req, res) => {
  const {
    body: {
      prenom,
      nom,
      email,
      password,
      dateNaissance,
      adresse,
      ville,
      codePostal,
      pays,
      telephone,
    },
  } = req

  const existingutilisateur = await UtilisateurModel.query().findOne({ email })

  if (existingutilisateur) {
    res.send({})
    return
  }

  const [hash, salt] = UtilisateurModel.hashPassword(password)

  await UtilisateurModel.query().insert({
    prenom,
    nom,
    email,
    passwordHash: hash,
    passwordSalt: salt,
    dateNaissance,
    adresse,
    ville,
    codePostal,
    pays,
    telephone,
  })

  res.send({})
}

export const signIn = async (req, res) => {
  const {
    body: { email, password },
  } = req

  const utilisateur = await UtilisateurModel.query().findOne({ email })

  if (!utilisateur || !utilisateur.checkPassword(password)) {
    res.status(401).send({ error: "Email ou mot de passe invalide." })
    return
  }
  const jwt = jsonwebtoken.sign(
    {
      payload: {
        utilisateur: {
          id: utilisateur.id,
          email: utilisateur.email,
          prenom: utilisateur.prenom,
          nom: utilisateur.nom,
          dateNaissance: utilisateur.dateNaissance,
          adresse: utilisateur.adresse,
          ville: utilisateur.ville,
          codePostal: utilisateur.codePostal,
          pays: utilisateur.pays,
          telephone: utilisateur.telephone,
        },
      },
    },
    config.security.password.secret,
    { expiresIn: config.security.password.expiresIn }
  )
  res.status(200).send({ jwt })
}
