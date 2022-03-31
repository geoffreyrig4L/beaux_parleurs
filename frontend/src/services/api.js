import axios from "axios"

let jwt = null

const getJWT = () => {
  jwt = jwt ?? localStorage.getItem("jwt")

  console.log(jwt)
  return jwt
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  //NEXT_PUBLIC_ evite de faire leaker des infos et est indispensable sinon le code ne fonctionne pas
  transformRequest: [
    (data, headers) => {
      headers.authentication = getJWT()
      headers.post["Content-Type"] = "application/json"
      headers.patch["Content-Type"] = "application/json"
      headers.put["Content-Type"] = "application/json"
      headers.delete["Content-Type"] = "application/json"
      return JSON.stringify(data)
    },
  ],
})

export default api
