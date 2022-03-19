export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("firstName").notNullable()
    table.text("lastName").notNullable()
    table.text("email").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.date("birthdate").notNullable()
    table.text("addressLine").notNullable()
    table.text("city").notNullable()
    table.text("zipcode").notNullable()
    table.text("country").notNullable()
    table.text("phone").notNullable().unique()
  })
  await knex.schema.createTable("topics", (table) => {
    table.increments("id")
    table.text("name").notNullable()
    table.text("creationDate").notNullable()
  })
  await knex.schema.createTable("comments", (table) => {
    table.increments("id")
    table.text("content").notNullable()
    table.text("sendingDate").notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("users")
  await knex.schema.dropTable("topics")
  await knex.schema.dropTable("comments")
}
