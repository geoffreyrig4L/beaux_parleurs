import { Formik, Field } from "formik"
import AppContext from "./AppContext"
import { useCallback, useContext } from "react"

const SignUpForm = () => {
  const { signUp } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({ prenom, nom, email, password }) => {
      return signUp(prenom, nom, email, password)
    },
    [signUp]
  )

  let cssChamp = "pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
  let cssLabel = "mr-[20px] mb-[6px] font-bold"

  return (
    <div>
      <Formik
        initialValues={{
          prenom: "",
          nom: "",
          email: "",
          password: "",
        }}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit }) => (
          <form className="m-auto w-[700px] mb-24" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between">
              <span className="flex flex-col">
                <label className={cssLabel}>Prénom :</label>
                <Field className={cssChamp} name="prenom" required />
                <label className={cssLabel}>Nom :</label>
                <Field className={cssChamp} name="nom" required />
              </span>
              <span className="flex flex-col">
                <label className={cssLabel}>Email :</label>
                <Field className={cssChamp} type="email" name="email" />

                <label className={cssLabel}>Mot de passe :</label>
                <Field className={cssChamp} type="password" name="password" />
              </span>
            </div>
            <div className="w-full mt-12 text-center">
              <button
                type="submit"
                className="bg-gray-100 w-[200px] h-8 rounded-lg hover:bg-teal-600 hover:text-white"
              >
                S&#8217;inscrire
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default SignUpForm
