import {
  faHeart as faHeartSolid,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

let like = null

const Sujet = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-center mb-16">Titre du sujet</h1>
      <div className="m-auto w-[1000px] p-8 flex flex-row justify-between bg-gray-50 w-full rounded-lg">
        <div>
          <span className="flex flex-col align-center">
            <FontAwesomeIcon icon={faCircleUser} />
          </span>
          <p className="text-lg font-bold">Name</p>
        </div>
        <p className="bg-gray-100 mx-5 p-5 flex-1 rounded-lg">Message</p>
        <span>
          {like ? (
            <FontAwesomeIcon
              icon={faHeartSolid}
              className="text-2xl px-4 text-lg text-indigo-600"
            />
          ) : (
            <FontAwesomeIcon
              icon={faHeartRegular}
              className="text-2xl px-4 text-lg text-indigo-600"
            />
          )}
        </span>
        <p>3</p>
      </div>
    </div>
  )
}

export default Sujet
