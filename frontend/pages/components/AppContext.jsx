import { createContext, useEffect, useCallback, useState } from "react"
import api from "../services/api"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null)

  const initSession = useCallback((jwt) => {
    if (!jwt) {
      return
    }
    const [payload] = jwt.split(".")
    const session = atob(payload)
    setSession(session)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    initSession(jwt)
  }, [initSession])

  const signIn = useCallback(async (email, password) => {
    try {
      const {
        data: { jwt },
      } = await api.post("/sign-in", { email, password })
      localStorage.setItem("jwt", jwt)
      initSession(jwt)
    } catch (err) {
      return { error: err }
    }
  }, [])
  return <AppContext.Provider {...props} value={{ session, signIn }} />
}

export default AppContext
