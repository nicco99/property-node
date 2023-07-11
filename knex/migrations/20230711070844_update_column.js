/**
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable("landlords", function (table) {
      table.dropUnique(["pasword"]);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.alterTable("landlords", function (table) {
      table.string("pasword", 255).unique().notNullable().alter();
    });
  };
  