import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import api from "../services/api"

const Like = (type, element, utilisateurId) => {
  function likerOuDisliker() {
    const elementId = element.id
    if (type === "commentaire") {
      console.log(type)
      if (
        element.likes_utilisateurs == null ||
        element.likes_utilisateurs != utilisateurId
      ) {
        api.post(`likes/commentaire`, { utilisateurId, elementId })
      } else {
        api.delete(
          `likes/utilisateur=${utilisateurId}&commentaire=${elementId}`
        )
      }
    } else if (type === "sujet") {
    }
    location.reload()
  }

  console.log(element)

  return <div onClick={() => likerOuDisliker()}>{logo()}</div>
}

export default Like
