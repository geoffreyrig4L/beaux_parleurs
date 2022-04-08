import AppContext from "./AppContext"
import { useCallback, useContext, useState } from "react"
import api from "../services/api"
import { FormField, Formik, Form } from "formik"

const AddComment = ({ addComment, titre, action, commentaire, sujetId }) => {
  const [session, router] = useContext(AppContext)
  const [apiError, setApiError] = useState(null)

  let idUtilisateur = ""
  if (session) {
    idUtilisateur = JSON.parse(session).payload.utilisateur.id
  }

  const publier = useCallback(
    async ({ contenu }) => {
      try {
        const like = 0
        const dateCreation = ""
        if (action === "creer") {
          await api.post("/commentaires", {
            contenu,
            like,
            dateCreation,
            idUtilisateur,
            sujetId,
          })
          router.push("/")
        }
      } catch (err) {
        setApiError(err.response.data.error)
        console.log(apiError)
      }
    },
    [router, idUtilisateur, sujetId, action, apiError]
  )

  return addComment ? (
    <div className="mt-8">
      <form className="flex flex-col mb-6">
        <label className="mr-[20px] font-bold">{titre}</label>
        <textArea
          id="contenuCommentaire"
          className="pl-[12px] py-2 bg-gray-50 h-24 max-h-[250px] min-h-[100px]"
          required
        >
          {commentaire.contenu}
        </textArea>
        <button
          className="bg-gray-100 w-full h-8 hover:bg-teal-600 hover:text-white"
          onClick={publier}
        >
          Publier
        </button>
      </form>
    </div>
  ) : (
    <div className="italic text-gray-400 text-sm mt-8">
      Cliquer ici pour ajouter un commentaire
    </div>
  )
}

export default AddComment
