import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import CommentairesListe from "./components/CommentairesListe"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState, useContext } from "react"
import AddComment from "./components/AddComment"
import api from "./services/api"
import AppContext from "./components/AppContext"

const formatterDate = (date) => {
  return (date = new Date(date).toLocaleString())
}

const Sujet = ({ sujetId }) => {
  const [sujet, setSujet] = useState([])
  const { session } = useContext(AppContext)
  const [apiError, setApiError] = useState(null)
  const [utilisateur, setUtilisateur] = useState([])
  const [operation, setOperation] = useState("+")
  const [addComment, setAddComment] = useState(false)

  useEffect(() => {
    if (sujetId && !isNaN(sujetId)) {
      api
        .get(`/sujets/${sujetId}`)
        .then((response) => setSujet(response.data))
        .catch((error) =>
          setApiError(
            error.response ? error.response.data.error : error.message
          )
        )
    }

    const utilisateurId = sujet.utilisateurs_id

    if (utilisateurId && !isNaN(utilisateurId)) {
      api
        .get(`/utilisateurs/${utilisateurId}`)
        .then((response) => setUtilisateur(response.data))
        .catch((error) =>
          setApiError(
            error.response ? error.response.data.error : error.message
          )
        )
    }
  }, [sujetId, sujet.utilisateurs_id])

  function plusOrMinus() {
    return operation === "+" ? setOperation("-") : setOperation("+")
  }

  function formAddComment() {
    return session ? (
      <div>
        <AddComment
          addComment={addComment}
          titre="Votre nouveau commentaire :"
          action="creer"
          commentaire={{}}
          sujetId={sujet.id}
        />
        <div
          className="text-center w-full bg-teal-500 rounded-lg hover:shadow-md  mb-[150px]"
          onClick={() => (
            (addComment = setAddComment(!addComment)), setOperation(plusOrMinus)
          )}
        >
          {operation === "+" ? (
            <FontAwesomeIcon icon={faPlus} className="text-white h-6 py-2" />
          ) : (
            <FontAwesomeIcon icon={faMinus} className="text-white h-6 py-2" />
          )}
        </div>
      </div>
    ) : (
      <h1 className="text-red-500 bg-red-100 p-6 rounded-sm mt-[55px] mb-[100px]">
        Connectez-vous pour ajouter un commentaire.
      </h1>
    )
  }

  return (
    <div className="m-auto w-[1000px]">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl pl-16 text-left mb-16">
          <span className="italic font-normal text-xl">Sujet : </span>
          {sujet.nom}
        </h1>
        <span className="text-right">
          <p className="text-sm">
            <span>Publié par : </span>
            <span className="font-bold">{utilisateur.prenom}</span>
          </p>
          <p className="mb-16 text-sm">
            <span>Le : </span>
            <span className="font-bold">
              {formatterDate(sujet.dateCreation)}
            </span>
          </p>
        </span>
      </div>
      <CommentairesListe sujetId={sujetId} />
      {formAddComment()}
    </div>
  )
}

export default Sujet
