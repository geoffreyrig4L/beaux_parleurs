import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import api from "../services/api"
import AppContext from "./AppContext"
import { useContext } from "react"
import Link from "next/link"

const ModifyOrUpdate = ({ commentaire }) => {
  const { session } = useContext(AppContext)

  let id = ""
  if (session) {
    id = JSON.parse(session).payload.utilisateur.id
  }

  function deleteCommentaire() {
    api
      .delete(`/commentaires/${commentaire.id}`)
      .then((response) => console.log(response))
      .catch((error) =>
        setApiError(error.response ? error.response.data.error : error.message)
      )
    location.reload()
  }

  console.log({ commentaire })

  if (id == commentaire.utilisateurs_id)
    return (
      <div className="flex flex-row justify-end mb-1">
        <button>
          <FontAwesomeIcon
            icon={faTrash}
            className="px-1 text-[11px] hover:text-indigo-400"
            onClick={() => deleteCommentaire()}
          />
        </button>
        <Link href="/modifierSonCommentaire">
          <a>
            <button>
              <FontAwesomeIcon
                icon={faPen}
                className="text-[11px] hover:text-indigo-400"
              />
            </button>
          </a>
        </Link>
      </div>
    )
  return ""
}

export default ModifyOrUpdate

/*    api
      .put(`/commentaires/${commentaire.id}`)
      .then((response) => console.log(response))
      .catch((error) =>
        setApiError(error.response ? error.response.data.error : error.message)
      )
    location.reload()*/
