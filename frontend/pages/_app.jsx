import { AppContextProvider } from "./components/AppContext"

const App = ({ Component, pageProps, ...otherProps }) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider> //otherprops contient un router pré-rempli
  )
}

export default App
