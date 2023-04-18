/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {

  return knex.schema.createTableIfNotExists('comments', table => {

    table.increments('id').primary()
    table.text('comment').notNullable()
    table.string('post_id').notNullable()
    table.string('user_id').notNullable()

    /**
     * NOTE: criar os campos de created at and updated at automaticamente
     */
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments')
};
