import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import CommentairesListe from "./components/CommentairesListe"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import AddForm from "./components/AddComment"

const Sujet = () => {
  const [operation, setOperation] = useState("+")
  const [addForm, setAddForm] = useState(false)

  function plusOrMinus() {
    return operation === "+" ? setOperation("-") : setOperation("+")
  }

  return (
    <div className="m-auto w-[1000px]">
      <h1 className="font-bold text-2xl pl-16 text-left mb-16">
        Titre du sujet
      </h1>
      <CommentairesListe />
      <AddForm addForm={addForm} />
      <div
        className="text-center w-full bg-teal-500 rounded-lg hover:shadow-md  mb-[150px]"
        onClick={() => (
          (addForm = setAddForm(!addForm)), setOperation(plusOrMinus)
        )}
      >
        {operation === "+" ? (
          <FontAwesomeIcon icon={faPlus} className="text-white h-6 py-2" />
        ) : (
          <FontAwesomeIcon icon={faMinus} className="text-white h-6 py-2" />
        )}
      </div>
    </div>
  )
}

export default Sujet
