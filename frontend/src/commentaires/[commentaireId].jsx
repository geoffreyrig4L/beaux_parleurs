import { useRouter } from "next/router"
import ModifierCommentaire from "../modifierSonCommentaire.jsx"

const CommentairePage = () => {
  const {
    query: { commentaireId },
  } = useRouter()

  return <ModifierCommentaire commentaireId={commentaireId} />
}

export default CommentairePage
