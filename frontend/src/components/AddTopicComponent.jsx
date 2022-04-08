import { Formik, Field } from "formik"
import { useCallback, useContext, useState } from "react"
import api from "../services/api"
import AppContext from "./AppContext"

const AddTopicComponent = () => {
  const { router, session } = useContext(AppContext)
  const [sujet, setSujet] = useState([])

  let sessionId
  if (session) {
    sessionId = JSON.parse(session).payload.utilisateur.id
  }

  const handleFormSubmit = useCallback(
    async ({ titre, contenu }) => {
      const like = 0
      const dateCreation = ""
      await api.post("/sujets", { titre, like, sessionId, dateCreation })

      await api.post("/commentaires", {
        contenu,
        like,
        sessionId,
        dateCreation,
      })
      router.push("/")
    },
    [router, sessionId]
  )

  const textArea = () => {
    return (
      <textarea className="mb-[10px] bg-gray-50 h-24 max-h-80 p-2" required />
    )
  }

  return (
    <div>
      <Formik
        intialValues={{ titre: "", contenu: "" }}
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
              name="titre"
              required
            />
            <label className="mr-[20px] mb-[6px] font-bold">
              Premier message :
            </label>
            <Field name="contenu" as={textArea} />
            <button
              type="submit"
              className="my-6 bg-gray-100 w-3/12 h-8 m-auto rounded-lg"
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
