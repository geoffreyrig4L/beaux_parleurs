import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import CommentairesListe from "./components/CommentairesListe"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import AddForm from "./components/AddComment"
import api from "./services/api"

const formatterDate = (date) => {
  return (date = new Date(date).toLocaleString())
}

const Sujet = ({ sujetId }) => {
  //const { session, router } = useContext(AppContext)
  const [sujet, setSujet] = useState([])
  const [sujetError, setSujetError] = useState(null)
  const [utilisateurError, setUtilisateurError] = useState(null)
  const [utilisateur, setUtilisateur] = useState([])
  const [operation, setOperation] = useState("+")
  const [addForm, setAddForm] = useState(false)

  useEffect(() => {
    if (sujetId && !isNaN(sujetId)) {
      api
        .get(`/sujets/${sujetId}`)
        .then((response) => setSujet(response.data))
        .catch((error) =>
          setSujetError(
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
          setUtilisateurError(
            error.response ? error.response.data.error : error.message
          )
        )
    }
  }, [sujetId, sujet.utilisateurs_id])

  function plusOrMinus() {
    return operation === "+" ? setOperation("-") : setOperation("+")
  }

  return (
    <div className="m-auto w-[1000px]">
      <h1 className="font-bold text-2xl pl-16 text-left mb-16">
        <span className="italic font-normal text-xl">Sujet : </span>
        {sujet.nom}
      </h1>
      <p className="text-sm">
        <span className="italic">Publié par : </span>
        <span className="font-bold">{utilisateur.prenom}</span>
      </p>
      <p className="mb-16 text-sm">
        <span className="italic">Le :</span>
        <span className="font-bold"> {formatterDate(sujet.dateCreation)}</span>
      </p>
      <CommentairesListe sujetId={sujetId} />
      <AddForm addForm={addForm} />
      <div
        className="text-center w-full bg-teal-500 rounded-lg hover:shadow-md  mb-[150px]"
        onClick={() => (
          (addForm = setAddForm(!addForm)), setOperation(plusOrMinus)
        )}
      >
        {operation === "+" ? (
          <FontAwesomeIcon icon={faPlus} className="text-white h-6 py-2" />
        ) : (
          <FontAwesomeIcon icon={faMinus} className="text-white h-6 py-2" />
        )}
      </div>
    </div>
  )
}

export default Sujet
