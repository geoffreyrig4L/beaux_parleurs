import AuthenticationForm from "./components/AuthenticationForm"
import AppContext from "./components/AppContext"
import { useContext } from "react"

const SignIn = () => {
  const { session, signOut } = useContext(AppContext)
  //const prenom = JSON.parse(session).payload.utilisateur.prenom

  const prenom = ""

  return !session ? (
    <div>
      <h1 className="font-bold text-2xl text-center mb-16">Se connecter</h1>
      <div className="w-[600px] m-auto">
        <AuthenticationForm />
        <p className="italic mt-">Vous n'avez pas de compte ?</p>
        <a href="/sign-up" className="text-sky-600 underline">
          Créer un compte
        </a>
      </div>
    </div>
  ) : (
    <div>
      <h1 className="font-bold text-xl text-center mb-8 pt-16">
        Vous êtes déjà connecter sous le nom de {prenom}
      </h1>
      <p className="text-center">
        <a className="text-sky-600 underline" onClick={signOut}>
          Se déconnecter
        </a>
      </p>
    </div>
  )
}

export default SignIn
