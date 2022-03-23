import { Formik, Field } from "formik"

const SignUpForm = () => {
  return (
    <div>
      <Formik>
        <Field type="email" name="email" placeholder="E-mail" />
        <Field type="password" name="password" placeholder="Mot de passe" />
        <Field type="name" name="name" placeholder="Prénom" />
        <Field type="lastName" name="lastName" placeholder="Nom" />
      </Formik>
    </div>
  )
}

export default SignUpForm
