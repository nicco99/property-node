/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const data = require("../../src/db/fixtures/landlords");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("landlords").del();
  await knex("landlords").insert(data);
};
