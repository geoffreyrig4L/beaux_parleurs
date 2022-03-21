import Link from "next/link"

const Banner = () => {
  return (
    <div className="bg-slate-300 h-24 flex flex-row justify-between items-center text-lg px-12 py-12">
      <h1 className="font-bold">Les beaux parleurs</h1>
      <nav>
        <Link href="/">
          <a className="px-4 py-2 hover:border-b-4 border-indigo-400 ">
            Voir les sujets
          </a>
        </Link>
        <Link href="/addTopic">
          <a className="px-4 py-2 hover:border-b-4 border-indigo-400">
            Ajouter un sujet
          </a>
        </Link>
        <Link href="/sign-in">
          <a className="px-4 py-2 hover:border-b-4 border-indigo-400">
            Se connecter
          </a>
        </Link>
      </nav>
    </div>
  )
}

export default Banner
