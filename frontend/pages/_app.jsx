import { AppContextProvider } from "./components/AppContext"
import "./styles/globals.css"
import Banner from "./Banner"

const App = ({ Component, pageProps, ...otherProps }) => {
  return (
    <AppContextProvider pageComponent={Component} router={otherProps.router}>
      <Banner />
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider> //otherprops contient un router pré-rempli
  )
}

export default App
