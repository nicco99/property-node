/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('properties', function (table) {
        table.increments('id');
        table.string('name', 255).unique().notNullable();
        table.string('county', 255).notNullable();
        table.string('sub_county', 255).notNullable();
    })
   
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("properties")
};
