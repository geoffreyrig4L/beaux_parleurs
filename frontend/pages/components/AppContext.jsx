import { createContext, useEffect, useCallback, useState } from "react"
import api from "../services/api"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const { pageComponent: Page, router, ...otherProps } = props
  const [session, setSession] = useState(null)

  const initSession = useCallback((jwt) => {
    if (!jwt) {
      setSession(null)
      return
    }
    const [, payload] = jwt.split(".")
    const session = atob(payload)
    setSession(session)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")

    initSession(jwt)
  }, [initSession])

  const signIn = useCallback(
    async (email, password) => {
      try {
        const {
          data: { jwt },
        } = await api.post("/sessions/sign-in", {
          email,
          password,
        })
        localStorage.setItem("jwt", jwt)
        initSession(jwt)
      } catch (err) {
        return { error: err }
      }
    },
    [initSession]
  )

  const signOut = () => {
    localStorage.clear()
    setSession(null)
    router.push("/sign-in")
  }

  const signUp = useCallback(
    async (prenom, nom, email, password) => {
      try {
        const dateCreation = ""
        await api.post("/sessions/sign-up", {
          prenom,
          nom,
          email,
          password,
          dateCreation,
        })
        signIn(email, password)
        router.push("/sign-in")
      } catch (err) {
        return { error: err }
      }
    },
    [router, signIn]
  )

  if (!session && Page.private) {
    return null
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{ router, session, signIn, signUp, signOut }}
    />
  )
}

export default AppContext
