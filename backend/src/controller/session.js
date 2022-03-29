import UtilisateurModel from "../models/Utilisateur.js"
import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"

export const signUp = async (req, res) => {
  /*
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

  const existingUser = await UtilisateurModel.query().findOne({ email })

  if (existingUser) {
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
  */
}

export const signIn = async (req, res) => {
  const {
    body: { email, password },
  } = req

  const user = await UtilisateurModel.query().findOne({ email })

  if (!user || !user.checkPassword(password)) {
    res.status(401).send({ error: "Invalid credentials" })
    return
  }
  const jwt = jsonwebtoken.sign(
    {
      payload: {
        user: {
          id: user.id,
          email: user.email,
          prenom: user.prenom,
          nom: user.nom,
          dateNaissance: user.dateNaissance,
          adresse: user.adresse,
          ville: user.ville,
          codePostal: user.codePostal,
          pays: user.pays,
          telephone: user.telephone,
        },
      },
    },
    config.security.password.secret,
    { expiresIn: config.security.password.expiresIn }
  )
  res.status(200).send({ jwt })
}
