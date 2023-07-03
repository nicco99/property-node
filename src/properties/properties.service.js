const knex = require("../db/fixtures/connection");
const mapProperties = require("../utils/map-properties");
function list() {
  return knex("properties").select("*");
}

function create(product) {
  return knex("properties")
    .insert(product)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedProperty) {
  return knex("properties")
    .where({ id: updatedProperty.id })
    .update(updatedProperty, "*");
}

function destroy(propertyId) {
  return knex("properties").where({ id: propertyId }).del();
}

function read(propertyId) {
  return knex("properties").select("*").where({ id: propertyId }).first();
}

module.exports = {
  list,
  read,
  update,
  create,
  destroy,
  // listOutOfStockCount,
  // listPriceSummary,
  // listTotalWeightByProduct
};
