import { Formik, Field } from "formik"
import AppContext from "./AppContext"
import { useCallback, useContext } from "react"
import * as Yup from "Yup"

const SignUpSchema = Yup.object().shape({
  prenom: Yup.string().required(),
  nom: Yup.string().required(),
  adresse: Yup.string().required(),
  ville: Yup.string().required(),
  pays: Yup.string().required(),
  codePostal: Yup.number().required().max(5, "Trop long !"),
  dateNaissance: Yup.date().required(),
  telephone: Yup.number().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
})

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
        validationSchema={SignUpSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <form
            className="flex flex-col m-auto w-[600px]"
            onSubmit={handleSubmit}
          >
            <label className="mr-[20px] mb-[6px] font-bold">Prénom :</label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              name="prenom"
            />

            <label className="mr-[20px] mb-[6px] font-bold">Nom :</label>
            <Field className="pl-[12px] mb-[10px] bg-gray-50 h-8" name="nom" />

            <label className="mr-[20px] mb-[6px] font-bold">Adresse :</label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              name="adresse"
            />

            <label className="mr-[20px] mb-[6px] font-bold">Ville :</label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              name="ville"
            />

            <label className="mr-[20px] mb-[6px] font-bold">Pays :</label>
            <Field className="pl-[12px] mb-[10px] bg-gray-50 h-8" name="pays" />

            <label className="mr-[20px] mb-[6px] font-bold">
              Code postal :
            </label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              name="codePostal"
            />

            <label className="mr-[20px] mb-[6px] font-bold">
              Date de naissance :
            </label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              name="dateNaissance"
            />

            <label className="mr-[20px] mb-[6px] font-bold">Téléphone :</label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              name="telephone"
            />

            <label className="mr-[20px] mb-[6px] font-bold">Email :</label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              type="email"
              name="email"
            />

            <label className="mr-[20px] mb-[6px] font-bold">
              Mot de passe :
            </label>
            <Field
              className="pl-[12px] mb-[10px] bg-gray-50 h-8"
              type="password"
              name="password"
            />
            <button className="my-6 bg-gray-100 w-3/12 h-8 m-auto rounded-lg">
              S'inscrire
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default SignUpForm
