import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import api from "../services/api"

const formatterDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const SujetsListe = () => {
  const [sujets, setSujets] = useState([])
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    api
      .get("/sujets")
      .then((response) => setSujets(response.data))
      .catch((error) =>
        setApiError(error.response ? error.response.data.error : error.message)
      )
  }, [])

  return (
    <ul>
      {sujets.map((sujet) => (
        <li key={sujet.id} className="mb-8">
          <a href={`/sujets/${encodeURIComponent(sujet.id)}`}>
            <div className="bg-gray-50 w-full p-8 rounded-lg hover:shadow-lg">
              <div className=" flex flex-row justify-between">
                <span className="font-bold text-2xl mb-8 m-6">{sujet.nom}</span>
                <span className="font-bold text-indigo-600">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-xl px-1 text-md text-indigo-600"
                  />
                  {sujet.like}
                </span>
              </div>
              <div className="text-right text-sm">
                <p>{sujet.auteur}</p>
                <p>{formatterDate(sujet.dateCreation)}</p>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SujetsListe
