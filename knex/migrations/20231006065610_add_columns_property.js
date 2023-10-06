/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("properties", function (table) {
    table.string("neighbourhood");
    table.string("owner");
    table.string("rent_duration");
    table.string("image_src");
    table.string("owner_contact");
    table.string("description");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
