import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-regular-svg-icons"
import { useState } from "react"

const Banner = () => {
  return (
    <div className="bg-teal-700 h-24 flex flex-row justify-between items-center text-lg px-122 mb-16">
      <h1 className="font-bold ml-12 text-xl ">Les bo'Parleurs</h1>
      <nav>
        <Link href="/">
          <a className="px-4 text-lg hover:text-teal-200">Voir les sujets</a>
        </Link>
        <Link href="/addTopic">
          <a className="px-4 text-lg hover:text-teal-200">Ajouter un sujet</a>
        </Link>
        <Link href="/sign-in">
          <a>
            <FontAwesomeIcon
              icon={faCircleUser}
              className="text-2xl px-4 text-lg pr-12 hover:text-teal-200"
            />
          </a>
        </Link>
      </nav>
    </div>
  )
}

export default Banner
