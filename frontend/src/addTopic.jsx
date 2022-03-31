import AddComponent from "./components/AddTopicComponent.jsx"

const AddTopic = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-center mb-16">Ajouter un sujet</h1>
      <AddComponent />
    </div>
  )
}

AddTopic.private = true

export default AddTopic
