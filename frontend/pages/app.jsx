import "../styles/globals.css"
const App = ({ Component, pageProps, ...otherProps }) => {
  return <Component {...pageProps} {...otherProps} /> //otherprops contient un router pré-rempli
}

export default MyApp
