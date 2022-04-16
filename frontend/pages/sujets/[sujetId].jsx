import { useRouter } from "next/router"
import Sujet from "../sujet.jsx"

const SujetPage = () => {
  const {
    query: { sujetId },
  } = useRouter()

  return <Sujet sujetId={sujetId} />
}

export default SujetPage
