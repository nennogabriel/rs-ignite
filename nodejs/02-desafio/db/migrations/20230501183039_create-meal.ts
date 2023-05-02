import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meals', table => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.timestamp('date').defaultTo(knex.fn.now()).notNullable(),
    table.boolean('is_on_diet').notNullable()
    table.integer('eater_id').notNullable()
    // table.foreign('eater_id').references('id').inTable('eaters')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meals')
}

