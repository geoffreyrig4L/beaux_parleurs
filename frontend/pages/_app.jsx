import { AppContextProvider } from "./components/AppContext"

const App = ({ Component, pageProps, ...otherProps }) => {
  return (
    <AppContextProvider pageComponent={Component} router={otherProps.router}>
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider> //otherprops contient un router pré-rempli
  )
}

export default App
