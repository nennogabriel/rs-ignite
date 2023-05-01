import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('eaters', table => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('username').notNullable().unique()
    table.string('session_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()

  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('eaters')
}
