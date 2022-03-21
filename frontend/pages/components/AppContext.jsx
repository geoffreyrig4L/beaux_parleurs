import { createContext, useEffect, useCallback, useState } from "react"
import api from "../services/api"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const { pageComponent: Page, router, ...otherProps } = props
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

  useEffect(() => {
    if (!session && Page.private) {
      router.push(`/?redirect=${encodeURIComponent(location.pathname)}`)
    }
  }, [session, router, Page.private])

  const signIn = useCallback(async (email, password) => {
    try {
      const {
        data: { jwt },
      } = await api.post("/sign-in", { email, password })
      localStorage.setItem("jwt", jwt)
      initSession(jwt)
      const {
        query: { redirect },
      } = router
      if (redirect) {
        router.push(decodeURIComponent(redirect))
      }
    } catch (err) {
      return { error: err }
    }
  }, [])

  if (!session && Page.private) {
    return null
  }
  return <AppContext.Provider {...otherProps} value={{ session, signIn }} />
}

export default AppContext
