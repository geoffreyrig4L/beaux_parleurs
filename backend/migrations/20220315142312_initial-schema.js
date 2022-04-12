export const up = async (knex) => {
  await knex.schema.createTable("utilisateurs", (table) => {
    table.increments().unique()
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
    table.timestamp("dateCreation").notNullable().defaultTo(knex.fn.now())
  })
  await knex.schema.createTable("sujets", (table) => {
    table.increments().unique()
    table.text("nom").notNullable()
    table.integer("sujets_utilisateurs").notNullable()
    table
      .foreign("sujets_utilisateurs")
      .references("id")
      .inTable("utilisateurs")
      .onDelete("SET NULL")
    table.timestamp("dateCreation").notNullable().defaultTo(knex.fn.now())
  })
  await knex.schema.createTable("commentaires", (table) => {
    table.increments().unique()
    table.text("contenu").notNullable()
    table.integer("commentaires_sujets").notNullable()
    table
      .foreign("commentaires_sujets")
      .references("id")
      .inTable("sujets")
      .onDelete("CASCADE")
    table.integer("commentaires_utilisateurs").notNullable()
    table
      .foreign("commentaires_utilisateurs")
      .references("id")
      .inTable("utilisateurs")
      .onDelete("SET NULL")
    table.timestamp("dateCreation").notNullable().defaultTo(knex.fn.now())
  })
  await knex.schema.createTable("likes", (table) => {
    table.increments().unique()
    table.integer("likes_sujets")
    table
      .foreign("likes_sujets")
      .references("id")
      .inTable("sujets")
      .onDelete("CASCADE")
    table.integer("likes_commentaires")
    table
      .foreign("likes_commentaires")
      .references("id")
      .inTable("commentaires")
      .onDelete("CASCADE")
    table.integer("likes_utilisateurs").notNullable()
    table
      .foreign("likes_utilisateurs")
      .references("id")
      .inTable("utilisateurs")
      .onDelete("CASCADE")
    table.timestamp("dateCreation").notNullable().defaultTo(knex.fn.now())
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("likes")
  await knex.schema.dropTable("commentaires")

  await knex.schema.dropTable("sujets")

  await knex.schema.dropTable("utilisateurs")
}
