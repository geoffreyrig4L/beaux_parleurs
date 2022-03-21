import AuthenticationForm from "./components/AuthenticationForm"

const SignIn = () => {
  return (
    <div>
      <h1>Se connecter</h1>
      <AuthenticationForm />
      <p>Vous n'avez pas de compte ?</p>
      <a href="/sign-up">Créer un compte</a>
    </div>
  )
}

export default SignIn
