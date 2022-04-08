import AddComponent from "./components/AddTopicComponent.jsx"
import { useContext } from "react"
import AppContext from "./components/AppContext"

const AddTopic = () => {
  const { session } = useContext(AppContext)
  return session ? (
    <div>
      <h1 className="font-bold text-2xl text-center mb-16">Ajouter un sujet</h1>
      <AddComponent />
    </div>
  ) : (
    <h1 className="text-red-500 bg-red-100 p-12 rounded-lg mt-[150px] w-[800px] ml-[300px]">
      Connectez-vous pour ajouter un sujet.
    </h1>
  )
}

export default AddTopic
