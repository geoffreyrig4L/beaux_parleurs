import AuthenticationForm from "./components/AuthenticationForm"

const SignIn = () => {
  return (
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
  )
}

export default SignIn
