import Link from "next/link"

const Banner = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-slate-300">
      <h1>Les beaux parleurs</h1>
      <nav>
        <Link href="/">
          <a>Voir les sujets</a>
        </Link>
        <Link href="/addTopic">
          <a>Ajouter un sujet</a>
        </Link>
        <Link href="/sign-in">
          <a>Se connecter</a>
        </Link>
      </nav>
    </div>
  )
}

export default Banner
