import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import api from "../services/api"

const formatterDate = (date) => {
  return (date = new Date(date).toLocaleString())
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

  return sujets.length != 0 ? (
    <ul className="mb-[165px]">
      {sujets.map((sujet) => (
        <li key={sujet.id} className="mb-8">
          <a href={`/sujets/${encodeURIComponent(sujet.id)}`}>
            <div className="bg-gray-50 w-full p-8 rounded-lg hover:shadow-lg">
              <div className=" flex flex-row justify-between">
                <span className="font-bold text-2xl mb-8 m-6">{sujet.nom}</span>
              </div>
              <div className="text-right text-sm font-medium text-indigo-600">
                <p>{sujet.auteur}</p>
                <p>{formatterDate(sujet.dateCreation)}</p>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  ) : (
    <h1 className="bg-gray-100 p-12 font-medium rounded-sm">
      Aucun sujet n'a été publiés.
    </h1>
  )
}

export default SujetsListe
