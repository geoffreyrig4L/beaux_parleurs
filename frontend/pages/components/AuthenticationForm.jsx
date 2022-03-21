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
          <form onSubmit={handleSubmit}>
            <Field type="email" name="email" placeholder="E-mail" />
            <Field type="password" name="password" placeholder="Password" />
            <button disabled={!isSubmitting && !isValid}>Sign In</button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default AuthentificationForm
