import { Formik, Field } from "formik"
import { useCallback, useContext } from "react"
import AppContext from "./AppContext"

const AddTopicComponent = () => {
  const { addTopic } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({ titre, contenu }) => {
      return addTopic(titre, contenu)
    },
    [addTopic]
  )

  const textArea = () => {
    return (
      <textarea
        className="pl-[12px] mb-[10px] bg-gray-50 h-24 max-h-80"
        required
      />
    )
  }

  return (
    <div>
      <Formik
        intialValues={{ titre: "", contenu: "" }}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <form
            className="flex flex-col m-auto w-[600px]"
            onSubmit={handleSubmit}
          >
            <label className="mr-[20px] mb-[6px] font-bold">Titre :</label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              name="titre"
            />
            <label className="mr-[20px] mb-[6px] font-bold">
              Premier message :
            </label>
            <Field name="contenu" as={textArea} />
            <button className="my-6 bg-gray-100 w-3/12 h-8 m-auto rounded-lg">
              Publier
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default AddTopicComponent
