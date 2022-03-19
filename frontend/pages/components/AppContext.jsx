import { createContext, useEffect, useCallback, useState } from "react"
import api from "../services/api.js"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null)
  useEffect(() => {
    const jwt = localStorage.getItem("session")
    if (!jwt) {
      return
    }
    const [payload] = jwt.split(".")
    const session = atob(payload) //convertit le format base64 en texte normal
  }, [])
  const signIn = useCallback(async (email, password) => {
    const { data } = api.post("sign-in", { email, password })
    console.log(data)
  }, [])
  return <AppContext.Provider {...props} value={{ session, signIn }} />
}

export default AppContext
