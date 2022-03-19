const { default: axios } = require("axios")

let jwt = null

const getJWT = () => {
  jwt = jwt ?? localStorage.getItem("jwt")
  return jwt
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, //NEXT_PUBLIC_ evite de faire leaker des infos et est indispensable sinon le code ne fonctionne pas
  transformRequest: [
    (data, headers) => {
      headers.authentification = getJWT()
      return data
    },
  ],
})

export default api
