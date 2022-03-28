import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const indexPage = () => (
  <div className="m-auto w-[800px]">
    <h1 className="font-bold text-2xl text-center mb-16">Sujets :</h1>
    <a href="/sujet">
      <p className=" flex flex-row justify-between bg-gray-50 w-full font-bold text-2xl p-4 pb-16 rounded-lg">
        <span>Titre</span>
        <span>
          <FontAwesomeIcon
            icon={faHeart}
            className="text-2xl px-4 text-lg text-indigo-600"
          />
          2
        </span>
      </p>
    </a>
  </div>
)

export default indexPage
