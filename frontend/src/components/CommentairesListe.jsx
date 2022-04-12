import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import {
  faHeart as faHeartSolid,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import api from "../services/api"
import ModifyOrUpdate from "./ModifyOrUpdate"
import AppContext from "./AppContext"

const formatterDate = (date) => {
  return (date = new Date(date).toLocaleString())
}

const CommentaireListe = ({ sujetId }) => {
  const [commentaires, setCommentaires] = useState([])
  const [likes, setLikes] = useState(0)
  const [apiError, setApiError] = useState(null)
  const { session } = useContext(AppContext)

  let utilisateurs_id = ""

  if (session) {
    utilisateurs_id = JSON.parse(session).payload.utilisateur.id
  }

  if (!sujetId) {
    sujetId = 1
  }

  useEffect(() => {
    api
      .get(`/sujets/${sujetId}/commentaires`)
      .then((response) => setCommentaires(response.data))
      .catch((error) =>
        setApiError(error.response ? error.response.data.error : error.message)
      )
  }, [sujetId])

  function asTuLike(commentaireId) {
    let asTuLike = false
    api
      .get(
        `utilisateurs/utilisateur=${utilisateurs_id}&commentaire=${commentaireId}/likes`
      )
      .then((response) => (asTuLike = response.data))
      .catch((error) =>
        setApiError(error.response ? error.response.data.error : error.message)
      )
    console.log(asTuLike)
    return !asTuLike ? (
      <FontAwesomeIcon
        icon={faHeartSolid}
        className="text-2xl text-lg px-1 text-indigo-600"
      />
    ) : (
      <FontAwesomeIcon
        icon={faHeartRegular}
        className="text-2xl text-lg px-1 text-indigo-600"
      />
    )
  }

  function likerCommentaire(commentaires_id) {
    //api.post(`likes/commentaire`, { utilisateurs_id, commentaires_id })
  }

  return (
    <ul>
      {commentaires.map((commentaire) => (
        <li key={commentaire.id} className=" mb-3">
          <div>
            <ModifyOrUpdate commentaire={commentaire} />
          </div>
          <div>
            <div className="p-4 flex flex-row justify-between bg-gray-50 w-full rounded-lg break-words">
              <div className="flex flex-col justify-start text-center align-center w-[75px]">
                <span className="text-xl mb-2">
                  <FontAwesomeIcon icon={faCircleUser} />
                </span>
                <p className="text-md text-indigo-600 font-medium">
                  {commentaire.auteur}
                </p>
              </div>
              <p className="bg-gray-100 mx-2 p-5 flex-1 rounded-lg w-[600px]">
                {commentaire.contenu}
              </p>
              <span onClick={likerCommentaire(commentaire.id)}>
                {asTuLike(commentaire.id)}
              </span>
              <p className="font-bold text-indigo-600">
                {commentaire.totalLikes}
              </p>
            </div>
            <p className="text-[0.6em] text-right">
              {formatterDate(commentaire.dateCreation)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CommentaireListe
