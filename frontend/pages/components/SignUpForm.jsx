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
          <form className="m-auto w-[700px]" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between">
              <span className="flex flex-col">
                <label className="mr-[20px] mb-[6px] font-bold">Prénom :</label>
                <Field
                  className="pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
                  name="prenom"
                />
                <label className="mr-[20px] mb-[6px] font-bold">Nom :</label>
                <Field
                  className="pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
                  name="nom"
                />
                <label className="mr-[20px] mb-[6px] font-bold">
                  Adresse :
                </label>
                <Field
                  className="pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
                  name="adresse"
                />
                <label className="mr-[20px] mb-[6px] font-bold">Ville :</label>
                <Field
                  className="pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
                  name="ville"
                />
                <label className="mr-[20px] mb-[6px] font-bold">Pays :</label>
                <Field
                  className="pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
                  name="pays"
                />
              </span>
              <span className="flex flex-col">
                <label className="mr-[20px] mb-[6px] font-bold">
                  Code postal :
                </label>
                <Field
                  className="pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
                  name="codePostal"
                />
                <label className="mr-[20px] mb-[6px] font-bold">
                  Date de naissance :
                </label>
                <Field
                  className="pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
                  name="dateNaissance"
                />

                <label className="mr-[20px] mb-[6px] font-bold">
                  Téléphone :
                </label>
                <Field
                  className="pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
                  name="telephone"
                />

                <label className="mr-[20px] mb-[6px] font-bold">Email :</label>
                <Field
                  className="pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
                  type="email"
                  name="email"
                />

                <label className="mr-[20px] mb-[6px] font-bold">
                  Mot de passe :
                </label>
                <Field
                  className="pl-[12px] mb-[10px] bg-gray-50 h-8 w-[300px]"
                  type="password"
                  name="password"
                />
              </span>
            </div>
            <div className="w-full mt-12 text-center">
              <button className="bg-gray-100 w-[200px] h-8 rounded-lg hover:bg-teal-600 hover:text-white">
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
