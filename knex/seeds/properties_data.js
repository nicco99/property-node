/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const data = require("../../src/db/fixtures/properties");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("properties").del();
  await knex("properties").insert(data);
};
