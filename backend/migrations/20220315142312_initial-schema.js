export const up = async (knex) => {
  await knex.schema.createTable("utilisateurs", (table) => {
    table.increments("id")
    table.text("prenom").notNullable()
    table.text("nom").notNullable()
    table.text("email").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.date("dateNaissance").notNullable()
    table.text("adresse").notNullable()
    table.text("ville").notNullable()
    table.text("codePostal").notNullable()
    table.text("pays").notNullable()
    table.text("telephone").notNullable().unique()
  })
  await knex.schema.createTable("sujets", (table) => {
    table.increments("id")
    table.text("nom").notNullable()
    table.text("dateCreation").notNullable()
  })
  await knex.schema.createTable("commentaires", (table) => {
    table.increments("id")
    table.text("contenu").notNullable()
    table.text("dateEnvoi").notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("utilisateurs")
  await knex.schema.dropTable("sujets")
  await knex.schema.dropTable("commentaires")
}
