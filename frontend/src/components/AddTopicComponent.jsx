import { Formik, Field } from "formik"
import { useCallback, useContext, useEffect, useState } from "react"
import api from "../services/api"
import AppContext from "./AppContext"

const AddTopicComponent = () => {
  const { router, session } = useContext(AppContext)
  const [sujet, setSujet] = useState({})
  const [apiError, setApiError] = useState(null)

  let utilisateurs_id
  if (session) {
    utilisateurs_id = JSON.parse(session).payload.utilisateur.id
  }

  const handleFormSubmit = useCallback(
    async ({ nom, contenu }) => {
      console.log(nom, contenu)
      try {
        await api.post("/sujets/with-first-comment", {
          nom,
          utilisateurs_id,
          contenu,
        })
      } catch (err) {
        return { error: err }
      }
    },
    [utilisateurs_id]
  )

  return (
    <div>
      <Formik
        initialValues={{ nom: "", contenu: "" }}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit }) => (
          <form
            className="flex flex-col m-auto w-[600px]"
            onSubmit={handleSubmit}
          >
            <label className="mr-[20px] mb-[6px] font-bold">Titre :</label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              name="nom"
              type="text"
              required
            />
            <label className="mr-[20px] mb-[6px] font-bold">
              Premier message :
            </label>
            <Field
              name="contenu"
              as="textArea"
              className="mb-[10px] bg-gray-50 h-24 max-h-80 p-2"
              required
            />
            <button
              type="submit"
              className="my-6 bg-gray-100 w-3/12 h-8 m-auto rounded-lg hover:bg-teal-600 hover:text-white"
            >
              Publier
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default AddTopicComponent
