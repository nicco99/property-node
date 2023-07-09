const landlordsService = require("./landlords.service");
const hasProperties = require("../errors/hasProperties");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = ["name", "property_id", "sub_county"];
const hasRequiredProperties = hasProperties("name", "county", "sub_county");
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function landlordExists(req, res, next) {
  const landlord = await landlordsService.read(req.params.landlordId);

  if (landlord) {
    res.locals.landlord = landlord;
    return next();
  }
  next({ status: 404, message: "landlord not found" });
}

function create(req, res, next) {
  landlordsService
    .create(req.body)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

async function read(req, res, next) {
  const { landlord } = res.locals;
  res.json({ data: landlord });
}

async function list(req, res) {
  const data = await landlordsService.list();
  res.json({ data });
}
async function update(req, res, next) {
  const updateLandlord = {
    ...req.body,
    id: res.locals.landlord.id,
  };
  const landlord = await landlordsService.update(updateLandlord);
  res.json({ data: landlord });
}
async function destroy(req, res, next) {
  const { landlord } = res.locals;
  await landlordsService.destroy(landlord.id);
  res.sendStatus(204);
}

module.exports = {
  create: [hasRequiredProperties, create],
  list: [asyncErrorBoundary(list)],
  read: [hasOnlyValidProperties, asyncErrorBoundary(landlordExists), read],
  update: [
    asyncErrorBoundary(landlordExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(landlordExists), asyncErrorBoundary(destroy)],
};
