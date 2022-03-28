import { Formik, Field } from "formik"
import { useCallback, useContext } from "react"
import AppContext from "./AppContext"

const AuthentificationForm = () => {
  const { signIn } = useContext(AppContext)
  const handleFormSubmit = useCallback(
    async ({ email, password }) => {
      return signIn(email, password)
    },
    [signIn]
  )
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <form
            className="flex flex-col m-auto w-[600px]"
            onSubmit={handleSubmit}
          >
            <label className="mr-[20px] mb-[6px] font-bold">Email : </label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              type="email"
              name="email"
            />

            <label className="mr-[20px] mb-[6px] font-bold">
              Mot de passe:
            </label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              type="password"
              name="password"
            />

            <button className="my-6 bg-gray-100 w-3/12 h-8 m-auto rounded-lg hover:bg-teal-600 hover:text-white">
              Se connecter
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default AuthentificationForm
