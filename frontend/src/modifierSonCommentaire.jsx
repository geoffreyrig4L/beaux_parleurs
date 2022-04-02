import AddComment from "./components/AddComment"

const modifierSonCommentaire = () => {
  return (
    <div className="m-auto w-[1000px]">
      <h1 className="font-bold text-2xl text-center mb-16">
        Modifier son commentaire
      </h1>
      <AddComment addComment={true} titre="Votre commentaire :" />
    </div>
  )
}

export default modifierSonCommentaire
