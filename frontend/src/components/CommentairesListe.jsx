import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import {
  faHeart as faHeartSolid,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import api from "../services/api"

const CommentaireListe = ({ sujetId }) => {
  const [commentaires, setCommentaires] = useState([])
  const [like, setLike] = useState(false)
  const [apiError, setApiError] = useState(null)

  //console.log(sujetId)

  useEffect(() => {
    api
      .get(`/sujets/${sujetId}/commentaires`)
      .then((response) => setCommentaires(response.data))
      .catch((error) =>
        setApiError(error.response ? error.response.data.error : error.message)
      )
  }, [sujetId])

  //console.log(commentaires)

  return (
    <div className="p-8 flex flex-row justify-between bg-gray-50 w-full rounded-lg">
      <div className="max-w-[120px] text-center">
        <span className="flex flex-col align-center">
          <FontAwesomeIcon icon={faCircleUser} />
        </span>
        <p className="text-lg font-bold whitespace-pre">Name</p>
      </div>
      <p className="bg-gray-100 mx-5 p-5 flex-1 rounded-lg">Message</p>
      <span>
        {like ? (
          <FontAwesomeIcon
            icon={faHeartSolid}
            className="text-2xl text-lg px-1 text-indigo-600"
            onClick={() => setLike(!like)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faHeartRegular}
            className="text-2xl text-lg px-1 text-indigo-600"
            onClick={() => setLike(!like)}
          />
        )}
      </span>
      <p>3</p>
    </div>
  )
}

export default CommentaireListe
