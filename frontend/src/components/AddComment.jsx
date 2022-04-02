import AppContext from "./AppContext"
import { useContext } from "react"
import api from "../services/api"

const AddComment = (props) => {
  const { session } = useContext(AppContext)

  let id = ""
  if (session) {
    id = JSON.parse(session).payload.utilisateur.id
  }

  function publier() {
    const contenu = document.getElementById("contenuCommentaire").value
    const like = 0
    const sujetId = props.sujetId
    if (props.action === "creer") {
      api.post("/commentaires", {
        contenu,
        like,
        sujetId,
        id,
      })
    } else if (props.action === "modifier") {
      api.put("/commentaires", {
        contenu,
      })
    }
  }

  return props.addComment ? (
    <div className="mt-8">
      <form className="flex flex-col mb-6">
        <label className="mr-[20px] font-bold">{props.titre}</label>
        <textArea
          id="contenuCommentaire"
          className="pl-[12px] py-2 bg-gray-50 h-24 max-h-[250px] min-h-[100px]"
          required
        >
          {props.commentaire.contenu}
        </textArea>
        <button
          className="bg-gray-100 w-full h-8 hover:bg-teal-600 hover:text-white"
          onClick={publier}
        >
          Publier
        </button>
      </form>
    </div>
  ) : (
    <div className="italic text-gray-400 text-sm mt-8">
      Cliquer ici pour ajouter un commentaire
    </div>
  )
}

export default AddComment
