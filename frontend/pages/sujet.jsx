import {
  faHeart as faHeartSolid,
  faCircleUser,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import AddForm from "./components/AddComment"

const Sujet = () => {
  const [like, setLike] = useState(false)
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
