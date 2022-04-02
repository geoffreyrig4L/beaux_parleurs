import { useEffect, useState } from "react"
import AddComment from "./components/AddComment"
import api from "./services/api"

const modifierSonCommentaire = ({ commentaireId }) => {
  const [commentaire, setCommentaire] = useState([])
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (commentaireId && !isNaN(commentaireId)) {
      api
        .get(`/commentaires/${commentaireId}`)
        .then((response) => setCommentaire(response.data))
        .catch((error) =>
          setApiError(
            error.response ? error.response.data.error : error.message
          )
        )
    }
  }, [commentaireId])

  console.log({ commentaire })

  return (
    <div className="m-auto w-[1000px]">
      <h1 className="font-bold text-2xl text-center mb-16">
        Modifier son commentaire
      </h1>
      <AddComment
        addComment={true}
        titre="Votre commentaire :"
        action="modifier"
        commentaire={commentaire}
        sujetId={commentaire.sujets_id}
      />
    </div>
  )
}

export default modifierSonCommentaire
