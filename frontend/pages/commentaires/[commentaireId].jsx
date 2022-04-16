import { useRouter } from "next/router"
import ModifierCommentaire from "../components/ModifierSonCommentaire.jsx"

const CommentairePage = () => {
  const {
    query: { commentaireId },
  } = useRouter()

  return <ModifierCommentaire commentaireId={commentaireId} />
}

export default CommentairePage
