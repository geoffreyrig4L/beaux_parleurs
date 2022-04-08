import AppContext from "./AppContext"
import { Formik, Field, Form } from "formik"
import { useCallback, useContext, useState, useEffect } from "react"
import api from "../services/api"

const AddComment = ({ addComment, titre, action, commentaire, sujetId }) => {
  const { session, router } = useContext(AppContext)
  const [apiError, setApiError] = useState(null)
  const [utilisateur, setUtilisateur] = useState(0)

  useEffect(() => {
    if (session) {
      setUtilisateur(JSON.parse(session).payload.utilisateur.id)
    }
  })

  const handleFormSubmit = useCallback(
    async ({ contenu }) => {
      const like = 0
      const dateCreation = ""

      try {
        if (action === "creer") {
          console.log("1 " + action)
          await api.post("/commentaires", {
            contenu,
            like,
            dateCreation,
            utilisateur,
            sujetId,
          })
        } else if (action === "modifier") {
          console.log("2 " + action)
          await api.put(`/commentaires/${commentaire.id}`, {
            contenu,
          })
          router.push(`/sujets/${sujetId}`)
        }
      } catch (err) {
        setApiError(err.response.data.error)
        console.log(apiError)
      }
    },
    [utilisateur, sujetId, action, apiError, commentaire.id, router]
  )

  return addComment ? (
    <div className="mt-8">
      <Formik initialValues={{ contenu: "" }} onSubmit={handleFormSubmit}>
        {({ handleSubmit }) => (
          <Form className="flex flex-col mb-6" onSubmit={handleSubmit}>
            <label className="mr-[20px] font-bold">{titre}</label>
            <Field
              as="textArea"
              name="contenu"
              id="contenu"
              className="pl-[12px] py-2 bg-gray-50 h-24 max-h-[250px] min-h-[100px]"
              required
            >
              {commentaire.contenu}
            </Field>
            <button
              className="bg-gray-100 w-full h-8 hover:bg-teal-600 hover:text-white"
              type="submit"
            >
              Publier
            </button>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <div className="italic text-gray-400 text-sm mt-8">
      Cliquer ici pour ajouter un commentaire
    </div>
  )
}

export default AddComment
