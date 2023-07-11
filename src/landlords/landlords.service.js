const knex = require("../db/fixtures/connection");
const mapProperties = require("../utils/map-properties");
function list() {
  return knex("landlords").select(
    "id",
    "first_name",
    "last_name",
    "username",
    "email",
    "p_number"
  );
}

function create(landlords) {
  return knex("landlords")
    .insert(landlords)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedLandlord) {
  return knex("landlords")
    .where({ id: updatedLandlord.id })
    .update(updatedLandlord, "*");
}

function destroy(landlordId) {
  return knex("landlords").where({ id: landlordId }).del();
}

function read(landlordId) {
  return knex("landlords").select("*").where({ id: landlordId }).first();
}

module.exports = {
  list,
  read,
  update,
  create,
  destroy,
};
