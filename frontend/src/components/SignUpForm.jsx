import { Formik, Field } from "formik"
import AppContext from "./AppContext"
import { useCallback, useContext } from "react"

const SignUpForm = () => {
  const { signUp } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({
      prenom,
      nom,
      adresse,
      ville,
      pays,
      codePostal,
      dateNaissance,
      telephone,
      email,
      password,
    }) => {
      return signUp(
        prenom,
        nom,
        adresse,
        ville,
        pays,
        codePostal,
        dateNaissance,
        telephone,
        email,
        password
      )
    },
    [signUp]
  )

  let cssChamp = "pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
  let cssLabel = "mr-[20px] mb-[6px] font-bold"

  function codePostal() {
    return <input maxLength={5} type="number" required className={cssChamp} />
  }

  function dateNaissance() {
    return <input type="date" required className={cssChamp} />
  }

  function telephone() {
    return <input maxLength={10} type="number" required className={cssChamp} />
  }

  return (
    <div>
      <Formik
        initialValues={{
          prenom: "",
          nom: "",
          adresse: "",
          ville: "",
          pays: "",
          codePostal: "",
          dateNaissance: "",
          telephone: "",
          email: "",
          password: "",
        }}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <form className="m-auto w-[700px] mb-24" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between">
              <span className="flex flex-col">
                <label className={cssLabel}>Prénom :</label>
                <Field className={cssChamp} name="prenom" required />
                <label className={cssLabel}>Nom :</label>
                <Field className={cssChamp} name="nom" required />
                <label className={cssLabel}>Adresse :</label>
                <Field className={cssChamp} name="adresse" required />
                <label className={cssLabel}>Ville :</label>
                <Field className={cssChamp} name="ville" required />
                <label className={cssLabel}>Pays :</label>
                <Field className={cssChamp} name="pays" required />
              </span>
              <span className="flex flex-col">
                <label className={cssLabel}>Code postal :</label>
                <Field as={codePostal} name="codePostal" />
                <label className={cssLabel}>Date de naissance :</label>
                <Field as={dateNaissance} name="dateNaissance" />

                <label className={cssLabel}>Téléphone :</label>
                <Field as={telephone} name="telephone" />

                <label className={cssLabel}>Email :</label>
                <Field className={cssChamp} type="email" name="email" />

                <label className={cssLabel}>Mot de passe :</label>
                <Field className={cssChamp} type="password" name="password" />
              </span>
            </div>
            <div className="w-full mt-12 text-center">
              <button
                disabled={!isSubmitting && !isValid}
                className="bg-gray-100 w-[200px] h-8 rounded-lg hover:bg-teal-600 hover:text-white"
              >
                S'inscrire
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default SignUpForm
