const knex = require("../db/fixtures/connection");
const mapProperties = require("../utils/map-properties");
function list() {
  return knex("properties").select("*");
}

function create(landlords) {
  return knex("landlords")
    .insert(landlords)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedLandlord) {
  return knex("landlord")
    .where({ id: updatedLandlord.id })
    .update(updatedLandlord, "*");
}

function destroy(landlordId) {
  return knex("landlord").where({ id: landlordId }).del();
}

function read(landlordId) {
  return knex("landlord").select("*").where({ id: landlordId }).first();
}

module.exports = {
  list,
  read,
  update,
  create,
  destroy,
};
