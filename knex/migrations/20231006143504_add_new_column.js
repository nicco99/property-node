/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
 return knex.schema.alterTable("properties", function (table) {
    table.dropColumn("owner_contact");
    table.string("amenities");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("properties", function (table) {
    table.dropColumn("amenities");
    table.string("owner_contact");
  });
};
