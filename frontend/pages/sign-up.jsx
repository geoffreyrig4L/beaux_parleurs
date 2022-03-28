import SignUpForm from "./components/SignUpForm"

const SignUp = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-center mb-16">S'inscrire</h1>
      <SignUpForm />
    </div>
  )
}

SignUp.private = false

export default SignUp
