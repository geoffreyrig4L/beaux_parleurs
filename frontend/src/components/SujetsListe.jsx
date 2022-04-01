import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import api from "../services/api"

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

  if (apiError) {
    return (
      <h1 className="text-red-500 bg-red-100 rounded-md p-4">
        La récupération des sujets a échouée.
      </h1>
    )
  }

  return (
    <ul>
      {sujets.map((sujet) => (
        <li key={sujet.id}>
          <a href={`/sujets/${encodeURIComponent(sujet.id)}`}>
            <div className=" flex flex-row justify-between bg-gray-50 w-full font-bold text-2xl p-4 pb-16 rounded-lg">
              <span>{sujet.nom}</span>
              <span>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-2xl px-4 text-lg text-indigo-600"
                />
                {sujet.like}
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SujetsListe
