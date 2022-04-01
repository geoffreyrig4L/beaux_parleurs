import { Formik, Field } from "formik"

const AddForm = (props) => {
  function textArea() {
    return (
      <textarea
        className="pl-[12px] py-2 bg-gray-50 h-24 max-h-[250px] min-h-[100px]"
        required
      />
    )
  }

  return props.addForm ? (
    <div className="mt-8">
      <Formik>
        <form className="flex flex-col mb-6">
          <label className="mr-[20px] font-bold">
            Votre nouveau commentaire :
          </label>
          <Field name="contenu" as={textArea} />
          <button className="bg-gray-100 w-full h-8 hover:bg-teal-600 hover:text-white">
            Publier
          </button>
        </form>
      </Formik>
    </div>
  ) : (
    <div className="italic text-gray-400 text-sm mt-8">
      Cliquer ici pour ajouter un commentaire
    </div>
  )
}

export default AddForm
